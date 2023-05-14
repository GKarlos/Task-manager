import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
  HostListener,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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
  @Input() focused = false;
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() closeTask = new EventEmitter<Task>();
  @Output() focus = new EventEmitter<void>();
  @Output() save = new EventEmitter<Task>();
  @Output() escapeKeyPress = new EventEmitter<void>();
  taskForm: FormGroup;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.onEscapeKeyPress();
    }
  }

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) {
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
    if (this.taskForm.invalid) return;
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

  onEscapeKeyPress() {
    if (!this.focused) return;
    if (this.editMode) this.toggleEditMode();
    else this.escapeKeyPress.emit();
  }

  toggleEditMode() {
    this.taskForm.patchValue(this.task);
    this.editMode = !this.editMode;

    if (
      this.task.title === '' &&
      this.task.description === '' &&
      !this.editMode
    )
      this.closeTask.emit(this.task);
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
