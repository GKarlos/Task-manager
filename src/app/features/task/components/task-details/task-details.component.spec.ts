import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDetailsComponent } from './task-details.component';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EMPTY_TASK, TEST_TASK } from '@task/constants/task.constants';
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

  it('should toggle edit mode when edit button is clicked', () => {
    const editButton = fixture.debugElement.query(
      By.css('[data-testid="task-edit"]')
    );
    editButton.triggerEventHandler('click', null);
    expect(component.editMode).toBeTrue();
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

  it('should emit the closeTask event when edit mode is turned off with an originally empty task', () => {
    spyOn(component.closeTask, 'emit');
    component.task = EMPTY_TASK;
    component.editMode = true;
    component.toggleEditMode();
    expect(component.closeTask.emit).toHaveBeenCalled();
  });

  it('should update task form when ngOnChanges is called', () => {
    const updatedTask = {
      ...TEST_TASK,
      title: 'Updated Task',
      description: 'Updated Task Description',
    };
    component.task = updatedTask;
    component.ngOnChanges({
      task: {
        currentValue: updatedTask,
        previousValue: TEST_TASK,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect(component.taskForm.value.title).toEqual(updatedTask.title);
    expect(component.taskForm.value.description).toEqual(
      updatedTask.description
    );
  });

  it('should save the edited task and toggle edit mode when saveTask is called', () => {
    spyOn(component.save, 'emit');
    component.editMode = true;
    fixture.detectChanges();

    const updatedTask = {
      ...TEST_TASK,
      title: 'Updated Title',
      description: 'Updated Description',
    };

    component.taskForm.patchValue(updatedTask);
    component.saveTask();

    expect(component.save.emit).toHaveBeenCalledWith(updatedTask);
    expect(component.editMode).toBe(false);
  });

  it('should display input fields for title and description when editMode is true', () => {
    component.editMode = true;
    fixture.detectChanges();

    const titleInputElement = fixture.debugElement.query(
      By.css('[data-testid="task-title-input"]')
    ).nativeElement;
    const descriptionInputElement = fixture.debugElement.query(
      By.css('[data-testid="task-description-input"]')
    ).nativeElement;

    expect(titleInputElement).toBeTruthy();
    expect(descriptionInputElement).toBeTruthy();
  });

  it('should not display input fields for title and description when editMode is false', () => {
    component.editMode = false;
    fixture.detectChanges();

    const titleInputElement = fixture.debugElement.query(
      By.css('[data-testid="task-title-input"]')
    );
    const descriptionInputElement = fixture.debugElement.query(
      By.css('[data-testid="task-description-input"]')
    );

    expect(titleInputElement).toBeNull();
    expect(descriptionInputElement).toBeNull();
  });

  it('should call saveTask when Save button is clicked', () => {
    spyOn(component, 'saveTask');
    component.editMode = true;
    fixture.detectChanges();

    const saveButton = fixture.debugElement.query(By.css('button'));
    saveButton.triggerEventHandler('click', null);

    expect(component.saveTask).toHaveBeenCalled();
  });

  it('should call onEscapeKeyPress method when Escape key is pressed', () => {
    spyOn(component, 'onEscapeKeyPress');
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    component.handleKeyboardEvent(escapeEvent);
    expect(component.onEscapeKeyPress).toHaveBeenCalled();
  });

  it('should toggle edit mode when onEscapeKeyPress is called with editMode set to true', () => {
    component.editMode = true;
    component.onEscapeKeyPress();
    expect(component.editMode).toBe(false);
  });

  it('should emit escapeKeyPress event when onEscapeKeyPress is called with editMode set to false', () => {
    spyOn(component.escapeKeyPress, 'emit');
    component.editMode = false;
    component.onEscapeKeyPress();
    expect(component.escapeKeyPress.emit).toHaveBeenCalled();
  });
});
