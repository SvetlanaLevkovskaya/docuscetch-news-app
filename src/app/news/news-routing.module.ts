import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NewsComponent } from './components/news.component'
import { AuthGuard } from '../core/guards/auth.guard'
import { CreateNewsComponent } from './components/createNews/create-news/create-news.component'
import { SubscriptionComponent } from './components/sibscription/subscription/subscription.component'

const routes: Routes = [
  { path: '', component: NewsComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  {
    path: 'create-news',
    component: CreateNewsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'subscribe',
    component: SubscriptionComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
