import { Component } from '@angular/core'
import { Observable } from 'rxjs'

import { NotificationService } from '../../../core/services/notification.service'
import { Notify } from '../../../core/interfaces/notify.interfaces'

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css'],
})
export class NotifyComponent {
  notify$?: Observable<Notify | null> = this.notificationService.notify$

  constructor(private notificationService: NotificationService) {}

  closeNotification() {
    this.notificationService.clear()
  }
}
