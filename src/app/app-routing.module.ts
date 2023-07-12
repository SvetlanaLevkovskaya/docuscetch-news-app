import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'

export const routes: Routes = [
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then(el => el.NewsModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(el => el.AuthModule),
  },
  /*  {
   path: '**',
   component: PageNotFoundComponent,
   },*/
  /*{ path: '', pathMatch: 'full', redirectTo: 'login' },*/
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
