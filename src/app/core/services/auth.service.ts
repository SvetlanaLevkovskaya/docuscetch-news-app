import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router'

import { EMPTY } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { ResultCodeEnum } from '../enums/resultCode.enum'
import { LoginRequestData, MeResponse } from '../models/auth.models'
import { CommonResponseType } from '../models/core.models'
import { NotificationService } from './notification.service'

@Injectable()
export class AuthService {
  isAuth = false

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  resolveAuthRequest: any = () => {}

  authRequest = new Promise(resolve => {
    this.resolveAuthRequest = resolve
  })

  login(data: LoginRequestData) {
    this.http
      .post<CommonResponseType<{ userId: number }>>(`${environment.baseUrl}/auth/login`, data)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.router.navigate(['/'])
          this.notificationService.handleSuccess(
            `User ${res.data.userId} are successfully signed in!`
          )
        } else {
          this.notificationService.handleError(res.messages[0])
        }
      })
  }

  logout() {
    this.http
      .delete<CommonResponseType>(`${environment.baseUrl}/auth/login`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.router.navigate(['/login'])
          this.notificationService.handleSuccess('You have been logged out successfully!')
        } else {
          this.notificationService.handleError(res.messages[0])
        }
      })
  }

  me() {
    this.http
      .get<CommonResponseType<MeResponse>>(`${environment.baseUrl}/auth/me`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.isAuth = true
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
