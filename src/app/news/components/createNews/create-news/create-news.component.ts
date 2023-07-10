import { Component, EventEmitter, Output } from '@angular/core'
import { NewsService } from '../../../services/news.service'
import { News } from '../../../models/news'
import { Router } from '@angular/router'
import { AuthService } from '../../../../core/services/auth.service'

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css'],
})
export class CreateNewsComponent {
  article: News = {
    id: 0,
    title: '',
    category: '',
    description: '',
    date: '',
  }

  @Output() articleCreated = new EventEmitter<void>()

  constructor(
    private newsService: NewsService,
    private router: Router,
    public authService: AuthService
  ) {}

  createArticle() {
    this.newsService.addNews(this.article)
    // Clear the form after adding the article
    this.article = {
      id: 0,
      title: '',
      category: '',
      description: '',
      date: '',
    }

    // Navigate to the home page
    this.router.navigate(['/'])
  }
}
