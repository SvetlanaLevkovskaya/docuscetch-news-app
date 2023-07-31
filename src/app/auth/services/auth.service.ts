import { Injectable, OnDestroy } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment'

import { EMPTY, Observable, Subscription, tap } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { ResultCode } from '../enam/resultCode.enum'

import { NotificationService } from '../../shared/services/notification.service'
import { LoginRequestDto, MeResponse } from '../interfaces/auth.interfaces'
import { CommonResponseType } from '../interfaces/core.interfaces'
import { Router } from '@angular/router'

@Injectable()
export class AuthService implements OnDestroy {
  isAuth = false
  userEmail = ''
  //Объект Subscription позволяет добавлять все подписки в один контейнер, что упрощает управление ими.
  private subscriptions = new Subscription()

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  login(data: Partial<LoginRequestDto>): void {
    this.userEmail = data.email || ''
    this.http
      .post<CommonResponseType<{ userId: number }>>(`${environment.baseUrl}/auth/login`, data)
      .pipe(
        catchError(this.errorHandler),
        tap(res => {
          if (res.resultCode === ResultCode.success) {
            this.handleSuccessLogin()
          } else {
            this.notificationService.handleError(res.messages[0])
          }
        })
      )
      .subscribe()
  }

  logout(): void {
    this.http
      .delete<CommonResponseType>(`${environment.baseUrl}/auth/login`)
      .pipe(
        catchError(this.errorHandler),
        tap(res => {
          if (res.resultCode === ResultCode.success) {
            this.handleSuccessLogout(this.userEmail)
          }
        })
      )
      .subscribe()
  }

  me(): Observable<CommonResponseType<MeResponse>> {
    return this.http.get<CommonResponseType<MeResponse>>(`${environment.baseUrl}/auth/me`).pipe(
      catchError(this.errorHandler),
      tap(res => {
        if (res.resultCode === ResultCode.success) {
          this.userEmail = res.data.email || ''
          this.isAuth = true
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  private errorHandler = (err: HttpErrorResponse): Observable<never> => {
    this.notificationService.handleError(err.message)
    return EMPTY
  }

  private handleSuccessLogin(): void {
    this.isAuth = true
    this.router.navigate(['/news']).then(() => console.log('navigate'))
    this.notificationService.handleSuccess(`User ${this.userEmail} successfully signed in!`)
  }

  private handleSuccessLogout(userEmail: string): void {
    this.isAuth = false
    this.userEmail = ''
    this.router.navigate(['/login'])
    this.notificationService.handleSuccess(`User ${userEmail} successfully logged out!`)
  }
}

/*@Injectable()
 export class AuthService {
 isAuth = false
 userEmail = ''

 constructor(
 private http: HttpClient,
 private router: Router,
 private notificationService: NotificationService
 ) {
 console.log('NotificationService from AuthService:', notificationService)
 }

 login(data: Partial<LoginRequestDto>) {
 console.log('Login data:', data)
 this.userEmail = data.email || ''
 this.http
 .post<CommonResponseType<{ userId: number }>>(`${environment.baseUrl}/auth/login`, data)
 .pipe(catchError(err => this.errorHandler(err)))
 .subscribe(res => {
 if (res.resultCode === ResultCode.success) {
 this.isAuth = true
 this.router.navigate(['/news']).then(() => console.log('navigate'))
 this.notificationService.handleSuccess(`User ${this.userEmail} successfully signed in!`)
 } else {
 console.log('Login failed')
 this.notificationService.handleError(res.messages[0])
 }
 })
 }

 logout() {
 this.http
 .delete<CommonResponseType>(`${environment.baseUrl}/auth/login`)
 .pipe(catchError(err => this.errorHandler(err)))
 .subscribe(res => {
 if (res.resultCode === ResultCode.success) {
 this.router.navigate(['/login'])
 console.log('this.userEmail - logout', this.userEmail)
 this.notificationService.handleSuccess(`User ${this.userEmail} successfully logout!`)
 }
 })
 }

 me() {
 return this.http.get<CommonResponseType<MeResponse>>(`${environment.baseUrl}/auth/me`).pipe(
 catchError(err => this.errorHandler(err)),
 tap(res => {
 if (res.resultCode == ResultCode.success) {
 this.userEmail = res.data.email || ''
 this.isAuth = true
 }
 })
 )
 }

 private errorHandler = (err: HttpErrorResponse) => {
 this.notificationService.handleError(err.message)
 return EMPTY //завершить поток данных без передачи значений дальше.
 }
 }*/
