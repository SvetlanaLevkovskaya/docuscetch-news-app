import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { LoginComponent } from './components/login/login.component'
import { AuthRoutingModule } from './auth-routing.module'

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, RouterModule],
})
export class AuthModule {}
