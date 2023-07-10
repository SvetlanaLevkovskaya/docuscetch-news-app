import { NgModule } from '@angular/core'
import { CommonModule, NgOptimizedImage } from '@angular/common'
import { NotifyComponent } from './components/notify/notify.component'
import { HeaderComponent } from './components/header/header/header.component'
import { RouterLink, RouterLinkActive } from '@angular/router'

@NgModule({
  declarations: [NotifyComponent, HeaderComponent],
  imports: [CommonModule, RouterLink, RouterLinkActive, NgOptimizedImage],
  exports: [NotifyComponent, HeaderComponent],
})
export class SharedModule {}
