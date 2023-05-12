import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDetailsComponent } from './task-details.component';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TEST_TASK } from '@task/constants/task-testing.constants';
import { TaskModule } from '@task/task.module';

describe('TaskDetailsComponent', () => {
  let component: TaskDetailsComponent;
  let fixture: ComponentFixture<TaskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, DragDropModule, TaskModule],
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

  it('should emit openEditDialog event when edit button is clicked', () => {
    spyOn(component.openEditDialog, 'emit');
    const editButton = fixture.debugElement.query(
      By.css('[data-testid="task-edit"]')
    );
    editButton.triggerEventHandler('click', null);
    expect(component.openEditDialog.emit).toHaveBeenCalledWith(component.task);
  });

  it('should emit deleteTask event when delete button is clicked', () => {
    spyOn(component.deleteTask, 'emit');
    const deleteButton = fixture.debugElement.query(
      By.css('[data-testid="task-delete"]')
    );
    deleteButton.triggerEventHandler('click', null);
    expect(component.deleteTask.emit).toHaveBeenCalledWith(component.task);
  });

  it('should display the task title and description', () => {
    const titleElement = fixture.debugElement.query(
      By.css('[data-testid="task-title"]')
    ).nativeElement;
    const descriptionElement = fixture.debugElement.query(
      By.css('[data-testid="task-description"]')
    ).nativeElement;

    expect(titleElement.textContent).toContain(component.task.title);
    expect(descriptionElement.textContent).toContain(
      component.task.description
    );
  });

  it('should emit the focus event when the component is clicked', () => {
    const taskDetails = fixture.debugElement.query(
      By.css('[data-testid="task-details"]')
    ).nativeElement;

    spyOn(component.focus, 'emit');
    taskDetails.dispatchEvent(new MouseEvent('mousedown'));

    expect(component.focus.emit).toHaveBeenCalled();
  });

  it('should emit closeTask event when close button is clicked', () => {
    spyOn(component.closeTask, 'emit');
    const closeButton = fixture.debugElement.query(
      By.css('[data-testid="task-close"]')
    );
    closeButton.triggerEventHandler('click', null);
    expect(component.closeTask.emit).toHaveBeenCalledWith(component.task);
  });
});
