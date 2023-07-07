import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NewsComponent } from './components/news.component'
import { AuthGuard } from '../core/guards/auth.guard'

const routes: Routes = [
  { path: '', component: NewsComponent, pathMatch: 'full', canActivate: [AuthGuard] },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
