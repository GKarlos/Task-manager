import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { TaskBoardComponent } from './task-board.component';
import { Task } from '@task/models/task';
import { TEST_TASK } from '@task/constants/task-testing.constants';
import { TaskModule } from '@task/task.module';

describe('TaskBoardComponent', () => {
  let component: TaskBoardComponent;
  let fixture: ComponentFixture<TaskBoardComponent>;
  let dialog: MatDialog;
  let testTaskList: Task[];
  let testTask: Task;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskModule, BrowserAnimationsModule],
      declarations: [TaskBoardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskBoardComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    testTask = TEST_TASK;
    testTaskList = [
      { ...testTask, id: '1' },
      { ...testTask, id: '2' },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update a task in the task list when handleEditTask is called', () => {
    component.tasks = testTaskList;

    const updatedTask: Task = {
      id: '1',
      title: 'Updated Task 1',
      description: 'Updated Task 1 description',
      isComplete: false,
      isExpanded: false,
    };

    component.handleEditTask(updatedTask);

    expect(component.tasks[0]).toEqual(updatedTask);
  });

  it('should not modify the task list when handleEditTask is called with an invalid task', () => {
    const initialTaskList: Task[] = testTaskList;

    component.tasks = [...initialTaskList];

    const nonExistentTask: Task = {
      id: '3',
      title: 'Non-Existent Task',
      description: 'Non-Existent Task description',
      isComplete: false,
      isExpanded: false,
    };

    component.handleEditTask(nonExistentTask);

    expect(component.tasks).toEqual(initialTaskList);
  });

  it('should delete a task from the task list when handleDeleteTask is called', () => {
    const taskToDelete = testTask;

    component.tasks = [...testTaskList, testTask] as Task[];

    component.handleDeleteTask(taskToDelete);

    expect(component.tasks.length).toBe(2);
    expect(component.tasks).not.toContain(taskToDelete);
    expect(component.tasks).toEqual(testTaskList);
  });

  it('should not modify the task list when handleDeleteTask is called with an invalid task', () => {
    const initialTaskList = testTaskList;

    component.tasks = [...initialTaskList];

    component.handleDeleteTask(testTask);

    expect(component.tasks).toEqual(initialTaskList);
  });

  it('should add a task to the task list when handleAddTask is called', () => {
    component.tasks = [...testTaskList];

    const newTask: Task = {
      id: '3',
      title: 'New Task',
      description: 'New Task description',
      isComplete: false,
      isExpanded: false,
    };

    component.handleAddTask(newTask);

    expect(component.tasks.length).toBe(3);
    expect(component.tasks).toContain(newTask);
  });
  it('should call openTaskDialog with the correct parameters for adding and editing tasks', () => {
    spyOn(component, 'openTaskDialog').and.callFake((task?: Task) => {
      const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', [
        'afterClosed',
        'close',
      ]);
      dialogRefSpy.afterClosed.and.returnValue(of(task));
      return dialogRefSpy;
    });

    component.openTaskDialog(undefined);
    expect(component.openTaskDialog).toHaveBeenCalledWith(undefined);

    component.openTaskDialog(testTask);
    expect(component.openTaskDialog).toHaveBeenCalledWith(testTask);
  });

  it('should handle the dialog result correctly for adding and editing tasks', () => {
    spyOn(component, 'handleAddTask');
    spyOn(component, 'handleEditTask');

    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', [
      'afterClosed',
      'close',
    ]);
    spyOn(dialog, 'open').and.returnValue(dialogRefSpy);

    dialogRefSpy.afterClosed.and.returnValue(of(testTask));
    component.openTaskDialog();
    dialogRefSpy.close();
    expect(component.handleAddTask).toHaveBeenCalledWith(testTask);

    dialogRefSpy.afterClosed.and.returnValue(of(testTask));
    component.openTaskDialog(testTask);
    dialogRefSpy.close();
    expect(component.handleEditTask).toHaveBeenCalledWith(testTask);
  });
});
