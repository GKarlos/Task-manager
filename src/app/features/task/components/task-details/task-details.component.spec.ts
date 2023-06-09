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
    component.focused = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('should save the edited task and toggle edit mode when saveTask is called with a valid form', () => {
    spyOn(component.save, 'emit');
    component.editMode = true;
    fixture.detectChanges();

    const updatedTask = {
      ...TEST_TASK,
      title: 'Updated Title',
      description: 'Updated Description',
    };

    component.taskForm.patchValue(EMPTY_TASK);
    component.saveTask();
    expect(component.save.emit).not.toHaveBeenCalled();
    expect(component.editMode).toBe(true);

    component.taskForm.patchValue(updatedTask);
    component.saveTask();

    expect(component.save.emit).toHaveBeenCalledWith(updatedTask);
    expect(component.editMode).toBe(false);
  });

  it('should display input fields for title and description only when editMode is true', () => {
    component.editMode = true;
    fixture.detectChanges();

    let titleInputElement = fixture.debugElement.query(
      By.css('[data-testid="task-title-input"]')
    )?.nativeElement;
    let descriptionInputElement = fixture.debugElement.query(
      By.css('[data-testid="task-description-input"]')
    )?.nativeElement;

    expect(titleInputElement).toBeTruthy();
    expect(descriptionInputElement).toBeTruthy();

    component.editMode = false;
    fixture.detectChanges();

    titleInputElement = fixture.debugElement.query(
      By.css('[data-testid="task-title-input"]')
    )?.nativeElement;
    descriptionInputElement = fixture.debugElement.query(
      By.css('[data-testid="task-description-input"]')
    )?.nativeElement;

    expect(titleInputElement).not.toBeTruthy();
    expect(descriptionInputElement).not.toBeTruthy();
  });

  it('should call saveTask when Save button is clicked', () => {
    component.editMode = true;
    spyOn(component, 'saveTask');
    component.editMode = true;
    fixture.detectChanges();

    const saveButton = fixture.debugElement.query(By.css('button'));
    saveButton.triggerEventHandler('click', null);

    expect(component.saveTask).toHaveBeenCalled();
  });

  it('should call onEscapeKeyPress method when Escape key is pressed', () => {
    component.focused = true;
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

  it('should handle icon events correctly', () => {
    spyOn(component, 'onEditTask');
    spyOn(component, 'onCloseTask');
    spyOn(component, 'onDeleteTask');
    for (const eventName in component.iconEventHandlers) {
      if (component.iconEventHandlers.hasOwnProperty(eventName)) {
        const handlerFunction = component.iconEventHandlers[eventName];
        handlerFunction();
      }
    }

    expect(component.onEditTask).toHaveBeenCalled();
    expect(component.onCloseTask).toHaveBeenCalled();
    expect(component.onDeleteTask).toHaveBeenCalled();
  });

  it('should save the task with the correct data when Save button is clicked', () => {
    component.editMode = true;
    spyOn(component.save, 'emit');
    component.taskForm.patchValue(TEST_TASK);

    const updatedTask = {
      ...TEST_TASK,
      title: 'Updated Title',
      description: 'Updated Description',
    };

    component.taskForm.patchValue(updatedTask);

    component.saveTask();

    expect(component.save.emit).toHaveBeenCalledWith(updatedTask);
  });
});
