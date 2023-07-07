import { Component } from '@angular/core'
import { AuthService } from '../../../../core/services/auth.service'
import { UserEmailService } from '../../../../core/services/userEmail.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private authService: AuthService, private userEmailService: UserEmailService) {}

  get userEmail(): string | undefined {
    return this.userEmailService.userEmail
  }

  logout(): void {
    this.authService.logout()
  }
}
