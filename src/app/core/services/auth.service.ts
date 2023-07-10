import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router'

import { BehaviorSubject, EMPTY, Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { ResultCodeEnum } from '../enums/resultCode.enum'
import { LoginRequestData, MeResponse } from '../models/auth.models'
import { CommonResponseType } from '../models/core.models'
import { NotificationService } from './notification.service'
import { UserEmailService } from './userEmail.service'

@Injectable()
export class AuthService {
  private sessionTokenKey = 'sessionToken'
  private isAuthSubject = new BehaviorSubject<boolean>(false)

  isAuth$: Observable<boolean> = this.isAuthSubject.asObservable()

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService,
    private userEmailService: UserEmailService
  ) {
    this.checkSessionToken()
  }

  private checkSessionToken(): void {
    const sessionToken = localStorage.getItem(this.sessionTokenKey)
    this.isAuthSubject.next(sessionToken !== null)
  }

  private setSessionToken(sessionToken: string | null): void {
    if (sessionToken) {
      localStorage.setItem(this.sessionTokenKey, sessionToken)
    } else {
      localStorage.removeItem(this.sessionTokenKey)
    }
    this.isAuthSubject.next(sessionToken !== null)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  resolveAuthRequest: any = () => {}

  authRequest = new Promise(resolve => {
    this.resolveAuthRequest = resolve
  })

  login(data: LoginRequestData) {
    this.http
      .post<CommonResponseType<{ userId: number; sessionToken: string }>>(
        `${environment.baseUrl}/auth/login`,
        data
      )
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.setSessionToken(res.data.sessionToken)
          this.router.navigate(['/'])
          this.notificationService.handleSuccess(
            `User ${this.userEmailService.userEmail} successfully signed in!`
          )
        } else {
          this.notificationService.handleError(res.messages[0])
        }
      })
  }

  logout() {
    this.http
    this.http
      .delete<CommonResponseType>(`${environment.baseUrl}/auth/login`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.setSessionToken(null)
          this.router.navigate(['/login'])
          this.notificationService.handleSuccess('You have been logged out successfully!')
        } else {
          this.notificationService.handleError(res.messages[0])
        }
      })
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuth$
  }
  me() {
    this.http
      .get<CommonResponseType<MeResponse>>(`${environment.baseUrl}/auth/me`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.setSessionToken(res.data.sessionToken)
          this.userEmailService.userEmail = res.data.email
        }
        this.resolveAuthRequest()
      })
  }

  private errorHandler(err: HttpErrorResponse | null) {
    let errorMessage: string

    if (err && err.error && typeof err.error === 'string') {
      errorMessage = err.error
    } else {
      errorMessage = 'Unknown error occurred.'
    }
    this.notificationService.handleError(errorMessage)
    return EMPTY
  }
}
