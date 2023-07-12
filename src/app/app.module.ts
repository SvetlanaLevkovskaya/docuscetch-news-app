import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { SharedModule } from './shared/shared.module'
import { NewsRoutingModule } from './news/news-routing.module'
import { AuthModule } from './auth/auth.module'
import { CredentialsInterceptor } from './auth/interseptors/credentials.interceptor'
import { AuthService } from './auth/services/auth.service'
import { NotificationService } from './shared/services/notification.service'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    NewsRoutingModule,
    AuthModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true },
    AuthService,
    NotificationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
