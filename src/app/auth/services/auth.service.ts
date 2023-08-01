import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment'

import { EMPTY, firstValueFrom } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { ResultCode } from '../enam/resultCode.enum'

import { NotificationService } from '../../shared/services/notification.service'
import { LoginRequestDto, MeResponse } from '../interfaces/auth.interfaces'
import { CommonResponseType } from '../interfaces/core.interfaces'
import { Router } from '@angular/router'

@Injectable()
export class AuthService {
  isAuth = false
  userEmail = ''

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  async login(data: Partial<LoginRequestDto>): Promise<void> {
    this.userEmail = data.email || ''
    try {
      const res = await firstValueFrom(
        this.http
          .post<
            CommonResponseType<{
              userId: number
            }>
          >(`${environment.baseUrl}/auth/login`, data)
          .pipe(catchError(err => this.errorHandler(err)))
      )
      if (res.resultCode === ResultCode.success) {
        this.handleSuccessLogin()
      } else {
        this.notificationService.handleError(res.messages[0])
      }
    } catch (err) {
      await this.errorHandler(err as Error | HttpErrorResponse)
    }
  }

  async logout(): Promise<void> {
    try {
      const res = await firstValueFrom(
        this.http
          .delete<CommonResponseType>(`${environment.baseUrl}/auth/login`)
          .pipe(catchError(err => this.errorHandler(err)))
      )
      if (res.resultCode === ResultCode.success) {
        this.handleSuccessLogout(this.userEmail)
      }
    } catch (err) {
      await this.errorHandler(err as Error | HttpErrorResponse)
    }
  }

  async me(): Promise<CommonResponseType<MeResponse>> {
    try {
      const res = await firstValueFrom(
        this.http
          .get<CommonResponseType<MeResponse>>(`${environment.baseUrl}/auth/me`)
          .pipe(catchError(err => this.errorHandler(err)))
      )
      if (res.resultCode === ResultCode.success) {
        this.userEmail = res.data.email || ''
        this.isAuth = true
      }
      return res
    } catch (err) {
      await this.errorHandler(err as Error | HttpErrorResponse)
      return firstValueFrom(EMPTY)
    }
  }

  private errorHandler = async (err: Error | HttpErrorResponse): Promise<never> => {
    this.notificationService.handleError(err.message)
    return Promise.reject(err)
  }

  private handleSuccessLogin(): void {
    this.isAuth = true
    this.router.navigate(['/news']).then(r => console.log(r))
    this.notificationService.handleSuccess(`User ${this.userEmail} successfully signed in!`)
  }

  private handleSuccessLogout(userEmail: string): void {
    this.isAuth = false
    this.userEmail = ''
    this.router.navigate(['/login'])
    this.notificationService.handleSuccess(`User ${userEmail} successfully logged out!`)
  }
}
