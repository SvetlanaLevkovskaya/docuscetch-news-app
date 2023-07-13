import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/auth/services/auth.service'

export const notAuthGuard = () => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const isAuth: boolean = authService.isAuth
  console.log('authGuard', isAuth)
  if (!isAuth && !router.url.includes('login')) {
    router.navigate(['/login'])
  }
  return isAuth
}
