import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Notify } from '../interfaces/notify.interfaces'

@Injectable()
export class NotificationService {
  notify$ = new BehaviorSubject<Notify | null>(null)

  handleError(message: string) {
    console.log('Error notification:', message)
    this.notify$.next({ severity: 'error', message })
  }

  handleSuccess(message: string) {
    console.log('Success notification:', message)
    this.notify$.next({ severity: 'success', message })
  }

  clear() {
    console.log('Clearing notifications')
    this.notify$.next(null)
  }
}
