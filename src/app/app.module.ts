import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TaskModule } from './features/task/task.module';
import { AuthenticationModule } from './features/authentication/authentication.module';
import { SettingsModule } from './features/settings/settings.module';
import { UserProfileModule } from './features/user-profile/user-profile.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    TaskModule,
    AuthenticationModule,
    SettingsModule,
    UserProfileModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
