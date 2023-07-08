import { Component } from '@angular/core'
import { NewsService } from '../services/news.service'
import { News } from '../models/news'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent {
  news: News[] = []
  filteredNews: News[] = []
  categories: string[] = []
  searchQuery: string = ''

  selectedCategory: string = 'All'

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.news = this.newsService.getNews()
    this.filteredNews = this.news
    this.categories = this.getUniqueCategories()
  }

  filterByCategory(category: string) {
    if (category === 'All') {
      this.filteredNews = this.news
    } else {
      this.filteredNews = this.news.filter(article => article.category === category)
    }
    this.selectedCategory = category
  }

  getUniqueCategories(): string[] {
    const categories = this.news.map(article => article.category)
    return [...new Set(categories)]
  }
}
