import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { LoginComponent } from './components/login/login.component'
import { AuthRoutingModule } from './auth-routing.module'
import { AuthService } from './services/auth.service'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { CredentialsInterceptor } from './interseptors/credentials.interceptor'

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true },
    AuthService,
  ],
})
export class AuthModule {}
