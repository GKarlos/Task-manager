import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Task } from '@task/models/task';
import { TaskListComponent } from '@task/components/task-list/task-list.component';
import { TaskModule } from '@task/task.module';
import { TEST_TASK } from '@task/constants/task-testing.constants';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let dialog: MatDialog;
  let testTask: Task;
  let testTaskList: Task[];
  let addButton: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskModule, BrowserAnimationsModule],
      declarations: [TaskListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    testTask = TEST_TASK;
    testTaskList = [
      { ...testTask, id: '1' },
      { ...testTask, id: '2' },
    ];
    addButton = fixture.debugElement.query(
      By.css('[data-testid="add-button"]')
    ).nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the expected task list title', () => {
    const title = fixture.debugElement.query(
      By.css('[data-testid="title"]')
    ).nativeElement;
    expect(title.textContent).toContain('Task List');
  });

  it('should render the correct number of task items', () => {
    component.taskList = [testTask, testTask] as Task[];
    fixture.detectChanges();
    const taskItems = fixture.debugElement.queryAll(
      By.css('.task-items app-task-item')
    );
    expect(taskItems.length).toBe(2);
  });

  it('should call addTask method when + is clicked', () => {
    spyOn(component, 'addTask');

    addButton.click();
    expect(component.addTask).toHaveBeenCalled();
  });

  it('should add a new task to the task list when dialogRef is closed', () => {
    component.taskList = [] as Task[];

    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', [
      'afterClosed',
      'close',
    ]);
    dialogRefSpy.afterClosed.and.returnValue(of(testTask));
    spyOn(dialog, 'open').and.returnValue(dialogRefSpy);

    addButton.click();

    expect(dialog.open).toHaveBeenCalled();

    dialogRefSpy.close();

    expect(component.taskList.length).toBe(1);
    expect(component.taskList[0]).toEqual(testTask);
  });

  it('should update a task in the task list when onTaskEdited is called', () => {
    component.taskList = testTaskList;

    const updatedTask: Task = {
      id: '1',
      title: 'Updated Task 1',
      description: 'Updated Task 1 description',
      isComplete: false,
      isExpanded: false,
    };

    component.onTaskEdited(updatedTask);

    expect(component.taskList[0]).toEqual(updatedTask);
  });

  it('should not modify the task list when onTaskEdited is called with an invalid task', () => {
    const initialTaskList: Task[] = testTaskList;

    component.taskList = [...initialTaskList];

    const nonExistentTask: Task = {
      id: '3',
      title: 'Non-Existent Task',
      description: 'Non-Existent Task description',
      isComplete: false,
      isExpanded: false,
    };

    component.onTaskEdited(nonExistentTask);

    expect(component.taskList).toEqual(initialTaskList);
  });

  it('should delete a task from the task list when onTaskDeleted is called', () => {
    const taskToDelete = testTask;

    component.taskList = [...testTaskList, testTask] as Task[];

    component.onTaskDeleted(taskToDelete);

    expect(component.taskList.length).toBe(2);
    expect(component.taskList).not.toContain(taskToDelete);
    expect(component.taskList).toEqual(testTaskList);
  });

  it('should not modify the task list when onTaskDeleted is called with an invalid task', () => {
    const initialTaskList = testTaskList;

    component.taskList = [...initialTaskList];

    component.onTaskDeleted(testTask);

    expect(component.taskList).toEqual(initialTaskList);
  });

  it('should not add a task to the task list when dialogRef is closed without saving', () => {
    component.taskList = [] as Task[];

    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', [
      'afterClosed',
      'close',
    ]);
    dialogRefSpy.afterClosed.and.returnValue(of(undefined));
    spyOn(dialog, 'open').and.returnValue(dialogRefSpy);

    addButton.click();

    expect(dialog.open).toHaveBeenCalled();

    dialogRefSpy.close();

    expect(component.taskList.length).toBe(0);
  });
});
