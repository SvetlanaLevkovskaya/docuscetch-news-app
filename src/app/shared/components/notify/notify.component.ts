import { Component } from '@angular/core'
import { Observable } from 'rxjs'

import { NotificationService } from '../../services/notification.service'
import { Notify } from '../../interfaces/notify.interfaces'

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css'],
})
export class NotifyComponent {
  notify$?: Observable<Notify | null> = this.notificationService.notify$

  constructor(private notificationService: NotificationService) {
    console.log('NotifyComponent created')

    this.notify$?.subscribe(notify => {
      console.log('Notification:', notify)
    })
  }

  closeNotification() {
    this.notificationService.clear()
  }
}
