import { Pipe, PipeTransform } from '@angular/core'
import { News } from '../models/news'

@Pipe({
  name: 'searchNews',
})
export class SearchNewsPipe implements PipeTransform {
  transform(news: News[], search: string): News[] {
    if (!search) {
      return news
    }

    const searchTerm = search.toLowerCase()

    return news.filter(article => article.title.toLowerCase().includes(searchTerm))
  }
}
