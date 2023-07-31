import { News } from '../interfaces/news.interfaces'
import { ActivatedRouteSnapshot, Router } from '@angular/router'
import { NewsService } from '../services/news.service'
import { from, lastValueFrom, map, Observable, of } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { NgxSpinnerService } from 'ngx-spinner'
import { inject } from '@angular/core'

export const articleResolver: (
  route: ActivatedRouteSnapshot
) => Observable<News | undefined> = route => {
  const newsService = inject(NewsService)
  const router = inject(Router)
  const spinner = inject(NgxSpinnerService)

  spinner.show()
  const articleId = route.paramMap.get('id')
  const articlePromise = newsService.getNewsById(articleId)

  return from(lastValueFrom(articlePromise)).pipe(
    map(article => {
      if (article) {
        spinner.hide()
        return article
      } else {
        spinner.hide()
        router.navigate(['/not-found'])
        return undefined
      }
    }),
    catchError(() => {
      spinner.hide()
      router.navigate(['/not-found'])
      return of(undefined).pipe(map(() => undefined as News | undefined))
    })
  )
}
