import { Component } from '@angular/core'
import { AuthService } from '../../../core/services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  get userEmail(): string | undefined {
    return this.authService.userEmail
  }

  logout(): void {
    this.authService.logout()
  }
}
