import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NewsComponent } from './components/news.component'
import { NewsRoutingModule } from './news-routing.module'
import { SharedModule } from '../shared/shared.module'
import { SearchNewsPipe } from './pipes/search-news.pipe'
import { CreateNewsComponent } from './components/create-news/create-news.component'
import { SubscriptionComponent } from './components/sibscription/subscription.component'
import { ArticleComponent } from './components/article/article.component'

@NgModule({
  declarations: [
    NewsComponent,
    SearchNewsPipe,
    CreateNewsComponent,
    SubscriptionComponent,
    ArticleComponent,
  ],
  imports: [CommonModule, NewsRoutingModule, FormsModule, SharedModule],
  providers: [],
})
export class NewsModule {}
