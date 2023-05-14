import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { TaskBoardComponent } from './task-board.component';
import { Task } from '@task/models/task';
import { EMPTY_TASK, TEST_TASK } from '@task/constants/task.constants';
import { TaskModule } from '@task/task.module';

describe('TaskBoardComponent', () => {
  let component: TaskBoardComponent;
  let fixture: ComponentFixture<TaskBoardComponent>;
  let testTaskList: Task[];
  let testTask: Task;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskModule, BrowserAnimationsModule],
      declarations: [TaskBoardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskBoardComponent);
    component = fixture.componentInstance;
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

  it('should update the task in all lists related to tasks when handleSaveTask is called', () => {
    component.tasks = testTaskList;
    component.selectedTasks = testTaskList;

    const updatedTask: Task = {
      id: '1',
      title: 'Updated Task 1',
      description: 'Updated Task 1 description',
      isComplete: false,
    };

    component.handleSaveTask(updatedTask);

    expect(component.tasks[0]).toEqual(updatedTask);
    expect(component.selectedTasks[0]).toEqual(updatedTask);
  });

  it('should add the task to tasksList when handleSaveTask is called with a new task', () => {
    component.tasks = [];
    component.selectedTasks = [{ ...EMPTY_TASK, id: '1' }];

    const newTask: Task = {
      id: '1',
      title: 'New Task',
      description: 'New Task description',
      isComplete: false,
    };

    component.handleSaveTask(newTask);

    expect(component.tasks).toContain(newTask);
    expect(component.selectedTasks).toContain(newTask);
  });

  it('should not modify the tasks list when handleSaveTask is called with an invalid task', () => {
    const initialTaskList = testTaskList;
    component.tasks = [...initialTaskList];
    component.selectedTasks = [...initialTaskList];

    component.handleSaveTask(testTask);

    expect(component.tasks).toEqual(initialTaskList);
    expect(component.selectedTasks).toEqual(initialTaskList);
  });

  it('should delete a task from the tasks and selected tasks list when handleDeleteTask is called', () => {
    const taskToDelete = testTask;

    component.tasks = [...testTaskList, taskToDelete] as Task[];
    component.selectedTasks = [taskToDelete];
    component.handleDeleteTask(taskToDelete);

    expect(component.tasks.length).toBe(2);
    expect(component.tasks).not.toContain(taskToDelete);
    expect(component.tasks).toEqual(testTaskList);

    expect(component.selectedTasks.length).toBe(0);
    expect(component.selectedTasks).not.toContain(taskToDelete);
    expect(component.selectedTasks).toEqual([]);
  });

  it('should not modify the tasks list when handleDeleteTask is called with an invalid task', () => {
    const initialTaskList = testTaskList;

    component.tasks = [...initialTaskList];

    component.handleDeleteTask(testTask);

    expect(component.tasks).toEqual(initialTaskList);
  });

  it('should add a task to the selected tasks list when handleAddTask is called', () => {
    component.selectedTasks = [...testTaskList];

    component.handleAddTask();

    expect(component.selectedTasks.length).toBe(3);
    expect(component.selectedTasks[2].title).toEqual('');
  });

  it('should add task to selectedTasks and focus it when onTaskSelected is called', () => {
    const taskToSelect = testTaskList[0];
    component.onTaskSelected(taskToSelect);
    expect(component.selectedTasks).toContain(taskToSelect);
    expect(component.focusedTask).toEqual(taskToSelect);
    expect(component.zIndexes[taskToSelect.id]).toBe(1);

    const taskToSelect1 = testTaskList[0];
    const taskToSelect2 = testTaskList[1];

    component.onTaskSelected(taskToSelect1);
    expect(component.selectedTasks).toContain(taskToSelect1);
    expect(component.focusedTask).toEqual(taskToSelect1);
    expect(component.zIndexes[taskToSelect1.id]).toBe(1);

    component.onTaskSelected(taskToSelect2);
    expect(component.selectedTasks).toContain(taskToSelect2);
    expect(component.zIndexes[taskToSelect1.id]).toBe(0);
    expect(component.zIndexes[taskToSelect2.id]).toBe(2);

    component.onTaskSelected(taskToSelect1);
    expect(component.zIndexes[taskToSelect1.id]).toBe(2);
    expect(component.zIndexes[taskToSelect2.id]).toBe(1);
  });

  it('should not add task to selectedTasks when onTaskSelected is called with an already existing task', () => {
    const taskToSelect = testTaskList[0];
    component.selectedTasks = [taskToSelect];
    component.onTaskSelected(taskToSelect);
    expect(component.selectedTasks.length).toBe(1);
    expect(component.selectedTasks).toContain(taskToSelect);
  });

  it('should remove the task from selectedTasks when handleCloseTask is called', () => {
    const taskToClose = testTaskList[0];
    component.selectedTasks = [...testTaskList];
    component.handleCloseTask(taskToClose);
    expect(component.selectedTasks.length).toBe(1);
    expect(component.selectedTasks).not.toContain(taskToClose);
  });

  it('should close only focused task when handleEscapeKeyPress is called', () => {
    const taskToSelect1 = testTaskList[0];
    const taskToSelect2 = testTaskList[1];

    component.onTaskSelected(taskToSelect1);
    component.onTaskSelected(taskToSelect2);

    component.handleEscapeKeyPress(taskToSelect1);
    component.handleEscapeKeyPress(taskToSelect2);

    expect(component.selectedTasks).toContain(taskToSelect1);
    expect(component.selectedTasks).not.toContain(taskToSelect2);
  });
});
