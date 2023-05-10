import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() addTask = new EventEmitter<Task>();

  constructor(public dialog: MatDialog) {}

  onAddTask() {
    if (this.dialogRefSubscription) {
      this.dialogRefSubscription.unsubscribe();
    }
    const dialogRef = this.dialog.open(TaskFormComponent);
    this.dialogRefSubscription = dialogRef
      .afterClosed()
      .subscribe((newTask: Task | undefined) => {
        if (newTask) this.addTask.emit(newTask);
      });
  }

  onDeleteTask(task: Task) {
    this.deleteTask.emit(task);
  }
}
