import { Component, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { Notify } from '../../../core/models/notify.models'
import { NotificationService } from '../../../core/services/notification.service'

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css'],
})
export class NotifyComponent implements OnInit {
  notify$?: Observable<Notify | null>
  notifySubscription?: Subscription

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    //subscribe
    this.notify$ = this.notificationService.notify$
    this.notifySubscription = this.notify$.subscribe()
  }

  closeNotification() {
    this.notificationService.clear()
  }
}
