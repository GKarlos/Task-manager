import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@shared/header/header.component';
import { FooterComponent } from '@shared/footer/footer.component';
import { ConfirmDialogComponent } from '@shared/confirm-dialog/confirm-dialog.component';
import { WindowSizeService } from '@shared/services/window-size.service';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, ConfirmDialogComponent],
  imports: [CommonModule],
  providers: [WindowSizeService],
})
export class SharedModule {}
