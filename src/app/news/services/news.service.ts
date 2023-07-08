import { Injectable } from '@angular/core'
import { news } from '../data/news'

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  getNews() {
    return news
  }
}
