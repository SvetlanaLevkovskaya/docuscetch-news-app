import { Component } from '@angular/core'
import { NewsService } from '../services/news.service'
import { Router } from '@angular/router'
import { News } from '../interfaces/news.interfaces'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent {
  filteredNews: News[] = this.newsService.getNews()
  categories: string[] = this.getUniqueCategories()
  searchQuery = ''
  selectedCategory = 'All'

  constructor(private newsService: NewsService, private router: Router) {}

  filterByCategory(category: string) {
    if (category === 'All') {
      this.filteredNews = this.newsService.getNews()
    } else {
      this.filteredNews = this.newsService
        .getNews()
        .filter(article => article.category === category)
    }
    this.selectedCategory = category
  }

  goToCreateNews() {
    this.router.navigate(['/create-news'])
  }

  goToArticle(article: News) {
    this.router.navigate(['news', article.id])
  }

  private getUniqueCategories(): string[] {
    const categories = this.newsService.getNews().map(article => article.category)
    return [...new Set(categories)]
  }
}
