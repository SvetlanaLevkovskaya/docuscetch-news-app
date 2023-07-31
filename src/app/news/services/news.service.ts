import { Injectable } from '@angular/core'
import { news } from '../data/news'
import { News } from '../interfaces/news.interfaces'
import { delay, Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private newsData: News[] = news

  getNews() {
    return this.newsData
  }

  getNewsById(id: string | null): Observable<News | undefined> {
    const article = this.newsData.find(a => a.id === id)
    return of(article).pipe(delay(3000))
  }

  addNews(article: News) {
    this.newsData.unshift(article)
  }
}
