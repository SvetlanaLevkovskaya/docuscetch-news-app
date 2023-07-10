import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { AuthService } from 'src/app/core/services/auth.service'
import { Observable, tap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log('AuthGuard is activated')
    return this.authService.isAuthenticated().pipe(
      tap(isAuth => {
        if (!isAuth) {
          this.router.navigate(['/login'])
        }
      })
    )
  }
}
