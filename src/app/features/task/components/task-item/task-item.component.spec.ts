import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TaskItemComponent } from './task-item.component';
import { TaskModule } from '@task/task.module';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
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

  it('should open the dialog with the correct data when edit button is clicked', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(component.task));

    spyOn(dialog, 'open').and.returnValue(dialogRefSpy);

    const editButton = fixture.debugElement.query(
      By.css('[data-testid="edit-button"]')
    ).nativeElement;

    editButton.click();

    expect(dialog.open).toHaveBeenCalledWith(
      TaskFormComponent,
      jasmine.objectContaining({
        data: TEST_TASK,
      })
    );
  });

  it('should emit the onTaskDeleted event when deleteTask is called', () => {
    spyOn(component.onTaskDeleted, 'emit');

    component.deleteTask();

    expect(component.onTaskDeleted.emit).toHaveBeenCalledWith(component.task);
  });

  it('should render the description when it is isExpanded', () => {
    component.isExpanded = true;
    fixture.detectChanges();

    const description = fixture.debugElement.query(
      By.css('[data-testid="task-description"]')
    );
    expect(description).toBeTruthy();
  });

  it('should not render the description when it is not isExpanded', () => {
    component.isExpanded = false;
    fixture.detectChanges();

    const description = fixture.debugElement.query(
      By.css('[data-testid="task-description"]')
    );
    expect(description).toBeFalsy();
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

  it('should change expansion status when the expand arrow is clicked', () => {
    fixture.detectChanges();
    const expandArrow = fixture.debugElement.query(
      By.css('[data-testid="task-expand"]')
    ).nativeElement;
    const expansionStatus = component.task.isExpanded;
    expandArrow.click();
    expect(component.isExpanded).toBe(!expansionStatus);
  });
});
