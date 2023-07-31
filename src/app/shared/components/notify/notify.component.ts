import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { Observable, Subject, takeUntil } from 'rxjs'

import { NotificationService } from '../../services/notification.service'
import { Notify } from '../../interfaces/notify.interfaces'

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotifyComponent implements OnInit, OnDestroy {
  notify$!: Observable<Notify | null>
  private unsubscribe$ = new Subject<void>()

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    console.log('NotifyComponent created')
    this.notify$ = this.notificationService.notify$.pipe(takeUntil(this.unsubscribe$))
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  closeNotification = () => {
    this.notificationService.clear()
  }
}
