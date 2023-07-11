import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NewsService } from '../../services/news.service'
import { News } from '../../models/news'

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

  constructor(private route: ActivatedRoute, private newsService: NewsService) {}

  ngOnInit() {
    const articleId = this.route.snapshot.paramMap.get('id')
    this.article = this.newsService.getNews().find(article => article.id === articleId)
  }
}
