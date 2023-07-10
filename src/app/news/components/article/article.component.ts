import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NewsService } from '../../services/news.service'
import { AuthService } from '../../../core/services/auth.service'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  article: any

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    const articleId = this.route.snapshot.paramMap.get('id')
    this.article = this.newsService.getNews().find(article => article.id === articleId)
  }
}
