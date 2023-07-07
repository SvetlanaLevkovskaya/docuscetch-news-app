import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NotifyComponent } from './components/notify/notify.component'
import { HeaderComponent } from './components/header/header/header.component'

@NgModule({
  declarations: [NotifyComponent, HeaderComponent],
  imports: [CommonModule],
  exports: [NotifyComponent, HeaderComponent],
})
export class SharedModule {}
