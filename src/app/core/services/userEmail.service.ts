import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class UserEmailService {
  private userEmailSubject = new BehaviorSubject<string | undefined>(undefined)

  userEmail$: Observable<string | undefined> = this.userEmailSubject.asObservable()

  constructor() {
    const userEmail = localStorage.getItem('userEmail')
    if (userEmail) {
      this.userEmailSubject.next(userEmail)
    }
  }

  setUserEmail(email: string): void {
    this.userEmailSubject.next(email)
    localStorage.setItem('userEmail', email)
  }

  clearUserEmail(): void {
    this.userEmailSubject.next(undefined)
    localStorage.removeItem('userEmail')
  }
}
