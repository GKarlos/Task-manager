import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDetailsComponent } from './task-details.component';
import { Task } from '@task/models/task';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TEST_TASK } from '@task/constants/task-testing.constants';

describe('TaskDetailsComponent', () => {
  let component: TaskDetailsComponent;
  let fixture: ComponentFixture<TaskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, DragDropModule],
      declarations: [TaskDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailsComponent);
    component = fixture.componentInstance;
    component.task = TEST_TASK;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit editTask event when edit button is clicked', () => {
    spyOn(component.editTask, 'emit');
    const editButton = fixture.debugElement.query(
      By.css('.actions mat-icon:first-child')
    );
    editButton.triggerEventHandler('click', null);
    expect(component.editTask.emit).toHaveBeenCalledWith(component.task);
  });

  it('should emit deleteTask event when delete button is clicked', () => {
    spyOn(component.deleteTask, 'emit');
    const deleteButton = fixture.debugElement.query(
      By.css('.actions mat-icon:last-child')
    );
    deleteButton.triggerEventHandler('click', null);
    expect(component.deleteTask.emit).toHaveBeenCalledWith(component.task);
  });

  it('should display the task title and description', () => {
    const titleElement = fixture.debugElement.query(By.css('h1')).nativeElement;
    const descriptionElement = fixture.debugElement.query(
      By.css('.task-description p')
    ).nativeElement;

    expect(titleElement.textContent).toContain(component.task.title);
    expect(descriptionElement.textContent).toContain(
      component.task.description
    );
  });
});
