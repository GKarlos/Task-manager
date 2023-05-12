import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Task } from '@task/models/task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent {
  @Input() task!: Task;
  @Input() zIndex = 0;
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() openEditDialog = new EventEmitter<Task>();
  @Output() closeTask = new EventEmitter<Task>();
  @Output() focus = new EventEmitter<void>();
  @Output() save = new EventEmitter<Task>();

  editMode: boolean = false;

  saveTask() {
    this.save.emit(this.task);
    this.toggleEditMode();
  }

  onDeleteTask() {
    this.deleteTask.emit(this.task);
  }

  onEditTask() {
    this.toggleEditMode();
  }

  onCloseTask() {
    this.closeTask.emit(this.task);
  }

  onClick() {
    this.focus.emit();
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }
}
