import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Task } from '@task/models/task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent {
  @Input() task!: Task;
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();

  onEditTask() {
    // handle with dialog
    this.editTask.emit(this.task);
  }

  onDeleteTask() {
    this.deleteTask.emit(this.task);
  }
}
