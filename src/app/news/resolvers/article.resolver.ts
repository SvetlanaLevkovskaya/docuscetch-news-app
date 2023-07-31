import { News } from '../interfaces/news.interfaces'
import { ResolveFn, Router } from '@angular/router'
import { NewsService } from '../services/news.service'
import { finalize, from, lastValueFrom, of, switchMap } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { NgxSpinnerService } from 'ngx-spinner'
import { inject } from '@angular/core'

//экспортируем функцию articleResolver для использования ее в маршруте
export const articleResolver: ResolveFn<News | undefined> = route => {
  // Injecting dependencies.
  const newsService = inject(NewsService) //внедряем сервис NewsService
  const router = inject(Router) //внедряем сервис Router
  const spinner = inject(NgxSpinnerService) //внедряем сервис NgxSpinnerService

  // Show spinner and get article ID.
  spinner.show().then(r => r) //показываем спиннер
  const articleId = route.paramMap.get('id') //получаем идентификатор статьи из параметров маршрута
  // Get the article from the service.
  const articlePromise = newsService.getNewsById(articleId) //получаем промис, который будет разрешен, когда статья будет получена из сервиса.

  // Convert the Promise to an Observable and switch to a new Observable if needed.
  // используем операторы from и lastValueFrom, чтобы преобразовать промис в Observable и далее использовать операторы в цепочке
  return from(lastValueFrom(articlePromise)).pipe(
    // используем оператор switchMap, чтобы переключаться на новый Observable в зависимости от результата предыдущего
    switchMap(article => {
      if (article) {
        // If the article exists, return an Observable with the article.
        return of(article)
      } else {
        // If the article doesn't exist, navigate to the not-found page and return an Observable with undefined.
        router.navigate(['/not-found']).then(r => r)
        return of(undefined)
      }
    }),
    catchError(() => {
      // If there is an error, navigate to the not-found page and return an Observable with undefined.
      router.navigate(['/not-found']).then(r => r)
      return of(undefined)
    }),
    finalize(() => {
      // Hide the spinner.
      spinner.hide().then(r => r)
    })
  )
}
