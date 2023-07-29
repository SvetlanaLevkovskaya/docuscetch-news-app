import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NewsComponent } from './components/news.component'
import { authGuard } from '../auth/guards/auth.guard'
import { CreateNewsComponent } from './components/create-news/create-news.component'
import { SubscriptionComponent } from './components/sibscription/subscription.component'
import { ArticleComponent } from './components/article/article.component'

const routes: Routes = [
  { path: '', component: NewsComponent, pathMatch: 'full' },

  {
    path: 'create-news',
    component: CreateNewsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'subscribe',
    component: SubscriptionComponent,
    canActivate: [authGuard],
  },
  { path: 'article/:id', component: ArticleComponent, canActivate: [authGuard] },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
