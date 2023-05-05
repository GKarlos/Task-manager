import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskRoutingModule } from './task-routing.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { ContainerTaskListComponent } from './containers/container-task/container-task-list.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskItemComponent,
    TaskFormComponent,
    ContainerTaskListComponent,
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
    MatCheckboxModule,
  ],
  exports: [ContainerTaskListComponent],
})
export class TaskModule {}
