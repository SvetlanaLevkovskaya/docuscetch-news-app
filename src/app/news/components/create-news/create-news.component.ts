import { Component, EventEmitter, Output } from '@angular/core'
import { NewsService } from '../../services/news.service'
import { v4 as uuidv4 } from 'uuid'
import { Router } from '@angular/router'
import { AuthService } from '../../../auth/services/auth.service'
import { NotificationService } from '../../../shared/services/notification.service'
import { News } from '../../interfaces/news.interfaces'

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css'],
})
export class CreateNewsComponent {
  article: News = {
    id: uuidv4(),
    title: '',
    category: '',
    description: '',
    date: '',
  }

  @Output() articleCreated = new EventEmitter<void>()

  constructor(
    private newsService: NewsService,
    private router: Router,
    public authService: AuthService,
    private notificationService: NotificationService
  ) {}

  createArticle() {
    this.newsService.addNews(this.article)
    // Clear the form after adding the article
    this.article = {
      id: '',
      title: '',
      category: '',
      description: '',
      date: '',
    }

    this.notificationService.handleSuccess(
      `User ${this.authService.userEmail} successfully published article!`
    )

    this.router.navigate(['/'])
  }
}
