import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '@task/models/task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  private _task!: Task;

  @Input()
  get task(): Task {
    return this._task;
  }
  set task(value: Task) {
    this._task = value;
    this.isExpanded = this._task ? this._task.isExpanded : false;
    this.isComplete = this._task ? this._task.isComplete : false;
  }

  @Output() deleteTask = new EventEmitter<Task>();

  isExpanded = false;
  isComplete = false;

  constructor(public dialog: MatDialog) {}

  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
  }

  onDeleteTask(): void {
    this.deleteTask.emit(this.task);
  }
}
