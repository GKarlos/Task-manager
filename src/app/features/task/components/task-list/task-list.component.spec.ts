import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Task } from '@task/models/task';
import { TaskListComponent } from '@task/components/task-list/task-list.component';
import { TaskModule } from '@task/task.module';
import { TEST_TASK } from '@task/constants/task.constants';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
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
    component.taskList = testTaskList;
    fixture.detectChanges();
    const taskItems = fixture.debugElement.queryAll(
      By.css('.task-list__items app-task-item')
    );
    expect(taskItems.length).toBe(2);
  });

  it('should emit deleteTask with the correct data when onDeleteTask is called', () => {
    const taskToDelete = testTask;

    spyOn(component.deleteTask, 'emit');

    component.onDeleteTask(taskToDelete);

    expect(component.deleteTask.emit).toHaveBeenCalledWith(testTask);
  });

  it('should emit selectTask with the correct data when onSelectTask is called', () => {
    const selectedTask = testTask;

    spyOn(component.selectTask, 'emit');

    component.onSelectTask(selectedTask);

    expect(component.selectTask.emit).toHaveBeenCalledWith(testTask);
  });
});
