import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/auth/services/auth.service'

export const authGuard = () => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const isAuth: boolean = authService.isAuth
  console.log('authGuard')
  if (!isAuth) {
    router.navigate(['/login'])
  }
  return isAuth
}
