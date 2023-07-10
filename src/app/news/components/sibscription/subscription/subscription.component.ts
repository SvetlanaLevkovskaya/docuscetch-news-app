import { Component } from '@angular/core'
import { AuthService } from '../../../../core/services/auth.service'

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
})
export class SubscriptionComponent {
  constructor(public authService: AuthService) {}
}
