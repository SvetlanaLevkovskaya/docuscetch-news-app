import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../../../core/services/auth.service'
import { UserEmailService } from '../../../../core/services/userEmail.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userEmail: string | undefined

  constructor(private authService: AuthService, private userEmailService: UserEmailService) {}

  ngOnInit() {
    this.userEmailService.userEmail$.subscribe(userEmail => {
      this.userEmail = userEmail
    })
  }

  logout(): void {
    this.authService.logout()
  }
}
