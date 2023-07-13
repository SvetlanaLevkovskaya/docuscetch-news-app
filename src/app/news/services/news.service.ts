import { Injectable } from '@angular/core'
import { news } from '../data/news'
import { News } from '../interfaces/news.interfaces'

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private newsData: News[] = news

  getNews() {
    return this.newsData
  }

  addNews(article: News) {
    this.newsData.unshift(article)
  }
}
