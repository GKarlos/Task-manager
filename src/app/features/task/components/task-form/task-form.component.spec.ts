import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskFormComponent } from './task-form.component';
import { Task } from '@task/models/task';
import { TEST_TASK } from '@task/constants/task-testing.constants';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<TaskFormComponent>>;
  let testTask: Task;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [TaskFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    testTask = TEST_TASK;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.taskForm.valid).toBeFalsy();
  });

  it('form should be valid when filled correctly', () => {
    component.taskForm.controls['title'].setValue(TEST_TASK.title);
    component.taskForm.controls['description'].setValue(TEST_TASK.description);
    expect(component.taskForm.valid).toBeTruthy();
  });

  it('should close dialog and return new task when form is submitted and valid', () => {
    component.taskForm.setValue(testTask);
    component.onSubmit();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(testTask);
  });

  it('should initialize form with the correct task data', () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [TaskFormComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: testTask },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.taskForm.get('title')?.value).toEqual(TEST_TASK.title);
    expect(component.taskForm.get('description')?.value).toEqual(
      TEST_TASK.description
    );
    expect(component.taskForm.get('id')?.value).toEqual(TEST_TASK.id);
  });
});
