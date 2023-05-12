import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TEST_TASK } from '@task/constants/task-testing.constants';
import { Task } from '@task/models/task';
import { TaskFormComponent } from '@task/components/task-form/task-form.component';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
})
export class TaskBoardComponent {
  tasks: Task[] = [TEST_TASK];
  selectedTasks: Task[] = [];
  zIndexes: { [key: string]: number } = {};
  focusedTask?: Task;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.focusedTask) {
      this.handleCloseTask(this.focusedTask);
    }
  }

  constructor(public dialog: MatDialog) {}

  handleAddTask(task: Task) {
    const existingTask = this.selectedTasks.find((t) => t.id === task.id);
    if (!existingTask) {
      this.tasks.push(task);
    }
  }

  handleSaveTask(task: Task) {
    const taskIndex = this.findTaskIndexByIdInArray(task.id, this.tasks);
    if (taskIndex >= 0) {
      Object.assign(this.tasks[taskIndex], task);
    }
  }

  handleEditTask(editedTask: Task) {
    const taskIndex = this.findTaskIndexByIdInArray(editedTask.id, this.tasks);
    if (taskIndex >= 0) {
      Object.assign(this.tasks[taskIndex], editedTask);
    }
  }

  handleCloseTask(task: Task) {
    const taskIndex = this.findTaskIndexByIdInArray(
      task.id,
      this.selectedTasks
    );
    if (taskIndex >= 0) {
      this.selectedTasks.splice(taskIndex, 1);
    }
  }

  handleDeleteTask(task: Task) {
    let taskIndex = this.findTaskIndexByIdInArray(task.id, this.tasks);
    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
    }
    this.handleCloseTask(task);
  }

  openTaskDialog(task?: Task) {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe((result: Task | undefined) => {
      if (result) {
        if (task) {
          this.handleEditTask(result);
        } else {
          this.handleAddTask(result);
        }
      }
    });
  }
  onTaskSelected(task: Task) {
    const existingTask = this.selectedTasks.find((t) => t.id === task.id);
    if (!existingTask) {
      this.selectedTasks.push(task);
    }
    this.focusTask(task);
  }

  focusTask(task: Task) {
    if (this.focusedTask?.id === task.id) return;
    this.decreaseZIndexes();
    this.zIndexes[task.id] = this.selectedTasks.length;
    this.focusedTask = task;
  }

  decreaseZIndexes() {
    this.selectedTasks.forEach((task) => {
      this.zIndexes[task.id] =
        this.zIndexes[task.id] - 1 < 0 ? 0 : this.zIndexes[task.id] - 1;
    });
  }

  private findTaskIndexByIdInArray(taskId: string, taskArray: Task[]): number {
    return taskArray.findIndex((task) => task.id === taskId);
  }
}
