import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { SharedModule } from './shared/shared.module'
import { CredentialsInterceptor } from './auth/interseptors/credentials.interceptor'
import { AuthService } from './auth/services/auth.service'
import { NotificationService } from './shared/services/notification.service'
import { EMPTY } from 'rxjs'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner'

export function initAuth(authService: AuthService) {
  return () => (!authService.isAuth ? authService.me() : EMPTY)
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth,
      deps: [AuthService],
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true },
    AuthService,
    NotificationService,
    NgxSpinnerService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
