import { inject } from '@angular/core'

import { AuthService } from 'src/app/auth/services/auth.service'
import { Router } from '@angular/router'

export const AuthGuard = () => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const isAuth: boolean = authService.isAuth
  console.log('authGuard', isAuth)
  if (!isAuth) {
    router.navigate(['/login']).then(r => console.log(r))
  }
  return isAuth
}
