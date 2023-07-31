import { Component, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { News } from '../../interfaces/news.interfaces'
import { NgxSpinnerService } from 'ngx-spinner'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [NgxSpinnerService],
})
export class ArticleComponent implements OnDestroy {
  article: News | undefined
  private articleSubscription: Subscription

  constructor(private route: ActivatedRoute) {
    this.articleSubscription = this.route.data.subscribe(({ article }) => {
      this.article = article
    })
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe()
  }
}
