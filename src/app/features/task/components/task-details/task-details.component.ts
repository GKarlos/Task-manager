import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '@task/models/task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnChanges {
  @Input() task!: Task;
  @Input() zIndex = 0;
  @Input() editMode = false;
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() closeTask = new EventEmitter<Task>();
  @Output() focus = new EventEmitter<void>();
  @Output() save = new EventEmitter<Task>();
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      id: [''],
      isComplete: [false],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task']) {
      this.taskForm.patchValue(this.task);
    }
  }

  saveTask() {
    this.save.emit(this.taskForm.value);
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
