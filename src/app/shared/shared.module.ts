import { NgModule } from '@angular/core'
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { NotifyComponent } from './components/notify/notify.component'
import { HeaderComponent } from './components/header/header.component'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { NotificationService } from './services/notification.service'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { CredentialsInterceptor } from '../auth/interseptors/credentials.interceptor'
import { AuthService } from '../auth/services/auth.service'

@NgModule({
  declarations: [NotifyComponent, HeaderComponent, PageNotFoundComponent],
  imports: [CommonModule, RouterLink, RouterLinkActive, NgOptimizedImage],
  exports: [NotifyComponent, HeaderComponent, PageNotFoundComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true },
    AuthService,
    NotificationService,
  ],
})
export class SharedModule {}
