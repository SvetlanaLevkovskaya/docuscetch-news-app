import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NewsComponent } from './components/news.component'
import { NewsRoutingModule } from './news-routing.module'
import { SharedModule } from '../shared/shared.module'
import { SearchNewsPipe } from './pipes/search-news.pipe'

@NgModule({
  declarations: [NewsComponent, SearchNewsPipe],
  imports: [CommonModule, NewsRoutingModule, FormsModule, SharedModule],
})
export class NewsModule {}
