import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { CredentialsInterceptor } from './interseptors/credentials.interceptor'
import { AuthService } from './services/auth.service'
import { NotificationService } from './services/notification.service'
import { UserEmailService } from './services/userEmail.service'

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true },
    AuthService,
    NotificationService,
    UserEmailService,
  ],
})
export class CoreModule {}
