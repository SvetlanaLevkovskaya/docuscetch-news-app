import { Component } from '@angular/core'
import { AuthService } from '../../../core/services/auth.service'
import { Router } from '@angular/router'
import { NotificationService } from '../../../core/services/notification.service'
import { Subscription } from '../../interfaces/subscription.interfaces'

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
})
export class SubscriptionComponent {
  protected readonly Subscription = Subscription
  selectedSubscription: Subscription = Subscription.Basic

  constructor(
    public authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  selectSubscription(subscription: Subscription): void {
    this.selectedSubscription = subscription
  }

  purchaseSubscription(): void {
    this.notificationService.handleSuccess(
      `User ${this.authService.userEmail} successfully purchased ${this.selectedSubscription} subscription!`
    )
    this.router.navigate(['/'])
  }
}
