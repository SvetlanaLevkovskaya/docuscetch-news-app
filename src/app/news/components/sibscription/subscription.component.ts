import { Component } from '@angular/core'
import { AuthService } from '../../../core/services/auth.service'
import { Router } from '@angular/router'
import { NotificationService } from '../../../core/services/notification.service'

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
})
export class SubscriptionComponent {
  selectedSubscription: string = 'basic'

  constructor(
    public authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.selectSubscription(this.selectedSubscription)
  }

  selectSubscription(subscription: string): void {
    this.selectedSubscription = subscription
  }

  purchaseSubscription(): void {
    this.notificationService.handleSuccess(
      `User ${this.authService.userEmail} successfully purchased ${this.selectedSubscription} subscription!`
    )
    this.router.navigate(['/'])
  }
}
