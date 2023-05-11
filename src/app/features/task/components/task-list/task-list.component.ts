import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '@task/models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  @Input() taskList: Task[] = [];
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() openAddDialog = new EventEmitter<void>();

  onDeleteTask(task: Task) {
    this.deleteTask.emit(task);
  }
}
