import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskRoutingModule } from '@task/task-routing.module';
import { TaskListComponent } from '@task/components/task-list/task-list.component';
import { TaskItemComponent } from '@task/components/task-item/task-item.component';
import { TaskBoardComponent } from '@task/components/task-board/task-board.component';
import { TaskDetailsComponent } from '@task/components/task-details/task-details.component';
import { ContainerTaskListComponent } from '@task/containers/container-task/container-task-list.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '@shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskItemComponent,
    ContainerTaskListComponent,
    TaskDetailsComponent,
    TaskBoardComponent,
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
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DragDropModule,
  ],
  exports: [ContainerTaskListComponent],
})
export class TaskModule {}
