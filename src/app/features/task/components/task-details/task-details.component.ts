import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Task } from '@task/models/task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent {
  @Input() task!: Task;
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() openEditDialog = new EventEmitter<Task>();

  onDeleteTask() {
    this.deleteTask.emit(this.task);
  }

  onEditTask() {
    this.openEditDialog.emit(this.task);
  }
}
