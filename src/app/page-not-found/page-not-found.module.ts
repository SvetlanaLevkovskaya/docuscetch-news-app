import { NgModule } from '@angular/core'

import { RouterModule } from '@angular/router'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { PageNotFoundRoutingModule } from './page-not-found-routing.module'

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [RouterModule, PageNotFoundRoutingModule],
})
export class PageNotFoundModule {}
