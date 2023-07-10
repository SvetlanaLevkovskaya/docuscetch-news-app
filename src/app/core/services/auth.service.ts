import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router'

import { EMPTY } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { ResultCodeEnum } from '../enums/resultCode.enum'
import { LoginRequestData, MeResponse } from '../models/auth.models'

import { NotificationService } from './notification.service'
import { CommonResponseType } from '../models/core.models'

@Injectable()
export class AuthService {
  isAuth = false
  userEmail = ''

  resolveAuthRequest: Function = () => {}
  authRequest = new Promise(resolve => {
    this.resolveAuthRequest = resolve
  })

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  login(data: Partial<LoginRequestData>) {
    this.http
      .post<CommonResponseType<{ userId: number }>>(`${environment.baseUrl}/auth/login`, data)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          console.log(this)
          this.router.navigate(['/'])
          this.notificationService.handleSuccess(`User ${this.userEmail} successfully signed in!`)
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
        }
      })
  }

  me() {
    this.http
      .get<CommonResponseType<MeResponse>>(`${environment.baseUrl}/auth/me`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode == ResultCodeEnum.success) {
          this.userEmail = res.data.email
          this.isAuth = true
        }
        this.resolveAuthRequest()
      })
  }

  private errorHandler(err: HttpErrorResponse) {
    this.notificationService.handleError(err.message)
    return EMPTY
  }
}

/*export class AuthService {
 isAuth = false

 constructor(
 private http: HttpClient,
 private router: Router,
 private notificationService: NotificationService,
 private userEmailService: UserEmailService
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
 `User ${this.userEmailService.userEmail} successfully signed in!`
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
 */

/*@Injectable()
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

  login(data: LoginRequestData) {
    this.http
      .post<CommonResponseType<{ userId: number; sessionToken: string }>>(
        `${environment.baseUrl}/auth/login`,
        data
      )
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map(res => res.data.sessionToken),
        tap(sessionToken => this.setSessionToken(sessionToken)),
        switchMap(sessionToken => this.me(sessionToken))
      )
      .subscribe({
        next: userEmail => {
          this.userEmailService.setUserEmail(userEmail.email)
          this.router.navigate(['/'])
          this.notificationService.handleSuccess(`User ${userEmail.email} successfully signed in!`)
        },
        error: error => {
          this.notificationService.handleError(error)
        },
      })
  }

  logout() {
    this.http
      .delete<CommonResponseType>(`${environment.baseUrl}/auth/login`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.setSessionToken(null)
          this.userEmailService.clearUserEmail()
          this.router.navigate(['/login'])
          this.notificationService.handleSuccess('You have been logged out successfully!')
        } else {
          this.notificationService.handleError(res.messages[0])
        }
      })
  }

  isAuthenticated(): Observable<boolean> {
    console.log('Checking authentication status', this.isAuth$)
    return this.isAuth$
  }*/

/*  me(sessionToken: string): Observable<{ email: string; sessionToken: string }> {
    return this.http.get<CommonResponseType<MeResponse>>(`${environment.baseUrl}/auth/me`).pipe(
      catchError(this.errorHandler.bind(this)),
      map(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          return { email: res.data.email, sessionToken }
        } else {
          throw new Error(res.messages[0])
        }
      })
    )
  }*/

/*  private errorHandler(err: HttpErrorResponse | null) {
    let errorMessage: string

    if (err && err.error && typeof err.error === 'string') {
      errorMessage = err.error
    } else {
      errorMessage = 'Unknown error occurred.'
    }
    return EMPTY.pipe(tap(() => this.notificationService.handleError(errorMessage)))
  }
}*/
