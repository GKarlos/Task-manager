import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Task } from '@task/models/task';
import { TaskFormComponent } from '@task/components/task-form/task-form.component';
import { Subscription } from 'rxjs';

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

  @Output() onTaskEdited = new EventEmitter<Task>();
  @Output() onTaskDeleted = new EventEmitter<Task>();
  private dialogRefSubscription: Subscription | undefined;

  isExpanded = false;
  isComplete = false;

  constructor(public dialog: MatDialog) {}

  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
  }

  editTask(): void {
    if (this.dialogRefSubscription) {
      this.dialogRefSubscription.unsubscribe();
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.task;

    const dialogRef = this.dialog.open(TaskFormComponent, dialogConfig);

    this.dialogRefSubscription = dialogRef
      .afterClosed()
      .subscribe((editedTask: Task | undefined) => {
        if (editedTask) {
          this.task = editedTask;
          this.onTaskEdited.emit(this.task);
        }
      });
  }

  deleteTask(): void {
    this.onTaskDeleted.emit(this.task);
  }
  onTaskisCompleteChange(): void {
    // Implemente ações quando o status de conclusão da tarefa for alterado, como salvar o estado atualizado da tarefa
  }
}
