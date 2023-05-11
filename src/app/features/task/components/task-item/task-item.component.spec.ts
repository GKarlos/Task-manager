import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TaskItemComponent } from './task-item.component';
import { TaskModule } from '@task/task.module';
import { MatDialog } from '@angular/material/dialog';
import { TEST_TASK } from '@task/constants/task-testing.constants';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskModule],
      declarations: [TaskItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    component.task = TEST_TASK;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the task title', () => {
    fixture.detectChanges();

    const taskContentElement = fixture.debugElement.query(
      By.css('[data-testid="task-title"]')
    ).nativeElement;
    expect((taskContentElement.textContent as string).trim()).toEqual(
      TEST_TASK.title
    );
  });

  it('should emit the deleteTask event when deleteTask is called', () => {
    spyOn(component.deleteTask, 'emit');

    component.onDeleteTask();

    expect(component.deleteTask.emit).toHaveBeenCalledWith(component.task);
  });

  it('should change completion status when the checkbox is clicked', () => {
    fixture.detectChanges();
    const checkbox = fixture.debugElement.query(
      By.css('[data-testid="task-checkbox"]')
    ).nativeElement;
    const completionStatus = component.task.isComplete;
    checkbox.click();
    expect(component.isComplete).toBe(!completionStatus);
  });

  it('should emit selectTask with the correct data when onSelectTask is called', () => {
    spyOn(component.selectTask, 'emit');

    component.onSelectTask();

    expect(component.deleteTask.emit).toHaveBeenCalledWith(TEST_TASK);
  });
});
