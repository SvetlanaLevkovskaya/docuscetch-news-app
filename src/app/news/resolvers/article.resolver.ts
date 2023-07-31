import { News } from '../interfaces/news.interfaces'
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router'
import { NewsService } from '../services/news.service'
import { map, Observable, of } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { NgxSpinnerService } from 'ngx-spinner'

@Injectable({
  providedIn: 'root',
})
export class ArticleResolver {
  constructor(
    private newsService: NewsService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  resolve: ResolveFn<News | undefined> = (
    route: ActivatedRouteSnapshot
  ): Observable<News | undefined> => {
    this.spinner.show()
    const articleId = route.paramMap.get('id')
    return this.newsService.getNewsById(articleId).pipe(
      map(article => {
        if (article) {
          this.spinner.hide()
          return article
        } else {
          this.spinner.hide()
          this.router.navigate(['/not-found'])
          return undefined
        }
      }),
      catchError(() => {
        this.spinner.hide()
        this.router.navigate(['/not-found'])
        return of(undefined).pipe(map(() => undefined as News | undefined))
      })
    )
  }
}
