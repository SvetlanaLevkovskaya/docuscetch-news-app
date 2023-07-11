import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Notify } from '../interfaces/notify.interfaces'

@Injectable()
export class NotificationService {
  notify$ = new BehaviorSubject<Notify | null>(null)

  handleError(message: string) {
    this.notify$.next({ severity: 'error', message })
  }

  handleSuccess(message: string) {
    this.notify$.next({ severity: 'success', message })
  }

  clear() {
    this.notify$.next(null)
  }
}
