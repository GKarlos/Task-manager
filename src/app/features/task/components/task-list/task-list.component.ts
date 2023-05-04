import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Task } from '@task/models/task';
import { TaskFormComponent } from '@task/components/task-form/task-form.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  @Input() taskList: Task[] = [];
  private dialogRefSubscription: Subscription | undefined;

  constructor(public dialog: MatDialog) {}

  addTask() {
    if (this.dialogRefSubscription) {
      this.dialogRefSubscription.unsubscribe();
    }
    const dialogRef = this.dialog.open(TaskFormComponent);
    this.dialogRefSubscription = dialogRef
      .afterClosed()
      .subscribe((newTask: Task | undefined) => {
        if (newTask) this.taskList.push(newTask);
      });
  }

  onTaskEdited(task: Task) {
    const taskIndex = this.taskList.findIndex((t) => t.id === task.id);
    if (taskIndex >= 0) {
      this.taskList[taskIndex] = task;
    }
  }

  onTaskDeleted(task: Task) {
    const taskIndex = this.taskList.findIndex((t) => t.id === task.id);
    if (taskIndex >= 0) {
      this.taskList.splice(taskIndex, 1);
    }
  }
}
