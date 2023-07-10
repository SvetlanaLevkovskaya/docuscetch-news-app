import { Component } from '@angular/core'
import { NewsService } from '../services/news.service'
import { News } from '../models/news'
import { Router } from '@angular/router'
import { AuthService } from '../../core/services/auth.service'

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

  constructor(
    private newsService: NewsService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.updateNews()
    this.categories = this.getUniqueCategories()
  }

  updateNews() {
    this.news = this.newsService.getNews()
    this.filterByCategory(this.selectedCategory)
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

  goToCreateNews() {
    this.router.navigate(['/create-news'])
  }

  onArticleCreated() {
    this.updateNews()
  }

  openArticle(article: News) {
    this.router.navigate(['/', article.id])
  }
}
