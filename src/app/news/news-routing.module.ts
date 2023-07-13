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
    pathMatch: 'full',

    canActivate: [authGuard],
  },
  {
    path: 'subscribe',
    component: SubscriptionComponent,
    pathMatch: 'full',
    canActivate: [authGuard],
  },
  { path: ':id', component: ArticleComponent, pathMatch: 'full', canActivate: [authGuard] },
  /*  {
   path: '**',
   component: PageNotFoundComponent,
   },*/
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
