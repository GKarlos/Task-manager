import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '@task/models/task';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
    const task = data || {};
    this.taskForm = this.fb.group({
      title: [task?.title, Validators.required],
      description: [task?.description, Validators.required],
      id: [task?.id],
      isComplete: [task?.isComplete || false],
      isExpanded: [task?.isExpanded || false],
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      let newTask: Task = this.taskForm.value;
      if (!newTask.id) {
        newTask.id = uuidv4();
      }
      this.dialogRef.close(newTask);
    }
  }
}
