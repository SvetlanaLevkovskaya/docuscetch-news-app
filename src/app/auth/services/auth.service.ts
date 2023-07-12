import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router'

import { EMPTY } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { ResultCode } from '../enam/resultCode.enum'

import { NotificationService } from '../../shared/services/notification.service'
import { LoginRequestDto, MeResponse } from '../interfaces/auth.interfaces'
import { CommonResponseType } from '../interfaces/core.interfaces'

@Injectable()
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

  resolveAuthRequest: (value?: unknown) => void = (value?: unknown) => {
    console.log(`Resolved with value: ${value}`)
  }

  authRequest = new Promise(resolve => {
    this.resolveAuthRequest = resolve
  })

  login(data: Partial<LoginRequestDto>) {
    console.log('Login data:', data)
    this.userEmail = data.email || ''
    console.log('this.userEmail before handlesuccess', this.userEmail)
    this.http
      .post<CommonResponseType<{ userId: number }>>(`${environment.baseUrl}/auth/login`, data)
      .pipe(catchError(err => this.errorHandler(err)))
      .subscribe(res => {
        if (res.resultCode === ResultCode.success) {
          console.log('Login successful')
          console.log('this.userEmail', this.userEmail)
          this.router.navigate(['/'])
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
    this.http
      .get<CommonResponseType<MeResponse>>(`${environment.baseUrl}/auth/me`)
      .pipe(catchError(err => this.errorHandler(err)))
      .subscribe(res => {
        if (res.resultCode == ResultCode.success) {
          this.userEmail = res.data.email || ''
          this.isAuth = true
        }
        this.resolveAuthRequest()
      })
  }

  private errorHandler = (err: HttpErrorResponse) => {
    this.notificationService.handleError(err.message)
    return EMPTY
  }
}
