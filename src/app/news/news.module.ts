import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NewsComponent } from './components/news.component'
import { NewsRoutingModule } from './news-routing.module'

@NgModule({
  declarations: [NewsComponent],
  imports: [CommonModule, NewsRoutingModule, FormsModule],
})
export class NewsModule {}
