import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from 'src/app/auth/services/auth.service'
import { LoginRequestDto } from '../../interfaces/auth.interfaces'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup = this.formBuilder.group({
    email: [
      '',
      [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,5}$')],
    ],
    password: ['', [Validators.required, Validators.minLength(3)]],
    rememberMe: [false],
  })

  constructor(private formBuilder: FormBuilder, public authService: AuthService) {}

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }

  onLoginSubmit() {
    const value = this.loginForm.value as LoginRequestDto
    this.authService.login(value)
  }
}
