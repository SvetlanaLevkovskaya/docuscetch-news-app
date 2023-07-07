import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NewsComponent } from './components/news.component'
import { NewsRoutingModule } from './news-routing.module'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [NewsComponent],
  imports: [CommonModule, NewsRoutingModule, FormsModule, SharedModule],
})
export class NewsModule {}
