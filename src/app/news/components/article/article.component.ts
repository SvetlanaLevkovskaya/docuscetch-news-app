import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NewsService } from '../../services/news.service'
import { News } from '../../interfaces/news.interfaces'
import { Router } from '@angular/router'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  article: News | undefined = {
    id: '',
    title: '',
    description: '',
    category: '',
    date: '',
  }

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private router: Router
  ) {}

  ngOnInit() {
    const articleId = this.route.snapshot.paramMap.get('id')
    this.article = this.newsService.getNews().find(article => article.id === articleId)
    if (!this.article) {
      this.router.navigate(['/not-found'])
    }
  }
}
