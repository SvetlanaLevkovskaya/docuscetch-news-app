import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Observable } from 'rxjs'

import { NotificationService } from '../../services/notification.service'
import { Notify } from '../../interfaces/notify.interfaces'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotifyComponent {
  notify: Notify | null = null
  notify$!: Observable<Notify | null>

  constructor(private notificationService: NotificationService) {
    this.notify$ = this.notificationService.notify$.pipe(takeUntilDestroyed())
    this.notify$.subscribe({
      next: value => (this.notify = value),
      error: error => this.notificationService.handleError(error),
    })
  }

  closeNotification = () => {
    this.notificationService.clear()
  }
}
