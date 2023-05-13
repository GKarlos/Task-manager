import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskRoutingModule } from '@task/task-routing.module';
import { TaskListComponent } from '@task/components/task-list/task-list.component';
import { TaskItemComponent } from '@task/components/task-item/task-item.component';
import { TaskBoardComponent } from '@task/components/task-board/task-board.component';
import { TaskDetailsComponent } from '@task/components/task-details/task-details.component';
import { ContainerTaskListComponent } from '@task/containers/container-task/container-task-list.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
    DragDropModule,
  ],
  exports: [ContainerTaskListComponent],
})
export class TaskModule {}
