import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EventBarComponent } from '@shared/components/title-bar/event-bar.component';

@NgModule({
  declarations: [EventBarComponent],
  imports: [CommonModule, MatIconModule],
  exports: [EventBarComponent],
  providers: [],
})
export class SharedModule {}
