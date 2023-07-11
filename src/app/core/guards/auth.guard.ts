import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { AuthService } from 'src/app/core/services/auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    await this.authService.authRequest // Wait for the authRequest Promise to resolve
    const isAuth: boolean = this.authService.isAuth // Access the resolved value
    if (!isAuth) {
      await this.router.navigate(['/login'])
    }
    return isAuth
  }
}
