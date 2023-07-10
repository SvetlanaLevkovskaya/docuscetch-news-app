import { Component, OnInit } from '@angular/core'
import { AuthService } from './core/services/auth.service'
import { UserEmailService } from './core/services/userEmail.service'
import { combineLatest } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userEmail: string | undefined

  constructor(private authService: AuthService, private userEmailService: UserEmailService) {}

  ngOnInit() {
    combineLatest([this.authService.isAuthenticated(), this.userEmailService.userEmail$]).subscribe(
      ([isAuthenticated, userEmail]) => {
        if (isAuthenticated) {
          this.authService.me(localStorage.getItem('sessionToken')!).subscribe({
            next: userEmail => {
              this.userEmail = userEmail.email
            },
            error: error => {
              console.error(error)
            },
          })
        } else {
          this.userEmail = userEmail
        }
      }
    )
  }
}
