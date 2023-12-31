import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component'

const routes: Routes = [
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then(el => el.NewsModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(el => el.AuthModule),
  },
  { path: '', redirectTo: 'news', pathMatch: 'full' },
  { path: 'not-found', component: PageNotFoundComponent },
  {
    path: '**',
    redirectTo: '/not-found',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
