import { Component } from '@angular/core';
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

  constructor(public dialog: MatDialog) {}

  handleAddTask(task: Task) {
    const existingTask = this.selectedTasks.find((t) => t.id === task.id);
    if (!existingTask) {
      this.tasks.push(task);
    }
  }

  handleEditTask(task: Task) {
    const taskIndex = this.tasks.findIndex((t) => t.id === task.id);
    if (taskIndex >= 0) {
      this.tasks[taskIndex] = task;
    }
  }

  handleDeleteTask(task: Task) {
    let taskIndex = this.tasks.findIndex((t) => t.id === task.id);
    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
    }
    taskIndex = this.selectedTasks.findIndex((t) => t.id === task.id);
    if (taskIndex >= 0) {
      this.selectedTasks.splice(taskIndex, 1);
    }
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
}
