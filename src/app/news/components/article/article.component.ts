import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { News } from '../../interfaces/news.interfaces'
import { NgxSpinnerService } from 'ngx-spinner'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [NgxSpinnerService],
})
export class ArticleComponent {
  article: News | undefined

  constructor(private route: ActivatedRoute) {
    this.route.data.pipe(takeUntilDestroyed()).subscribe(({ article }) => {
      this.article = article
    })
  }
}
