import { Component, HostListener } from '@angular/core';
import { EMPTY_TASK, TEST_TASK } from '@task/constants/task.constants';
import { Task } from '@task/models/task';
import { v4 as uuidv4 } from 'uuid';

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

  handleAddTask() {
    const newTask = { ...EMPTY_TASK } as Task;
    newTask.id = uuidv4();
    this.onTaskSelected(newTask);
  }

  handleSaveTask(task: Task) {
    const taskIndex = this.findTaskIndexByIdInArray(
      task.id,
      this.selectedTasks
    );
    if (taskIndex >= 0) {
      Object.assign(this.selectedTasks[taskIndex], task);
      if (this.findTaskIndexByIdInArray(task.id, this.tasks) < 0)
        this.tasks.push(this.selectedTasks[taskIndex]); // Needs to have same reference, can't use task.
    }
  }

  handleCloseTask(task: Task) {
    const taskIndex = this.findTaskIndexByIdInArray(
      task.id,
      this.selectedTasks
    );
    if (taskIndex >= 0) {
      this.selectedTasks.splice(taskIndex, 1);
      delete this.zIndexes[task.id];

      //change the focused task to the task that has the highest z index, or undefined if there are no tasks
      if (this.selectedTasks.length === 0) {
        this.focusedTask = undefined;
        return;
      }
      const highestZIndexTask = this.selectedTasks.reduce((prev, current) =>
        this.zIndexes[prev.id] > this.zIndexes[current.id] ? prev : current
      );
      this.focusedTask = highestZIndexTask;
    }
  }

  handleDeleteTask(task: Task) {
    let taskIndex = this.findTaskIndexByIdInArray(task.id, this.tasks);
    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
    }
    this.handleCloseTask(task);
  }

  handleEscapeKeyPress(task: Task) {
    if (this.focusedTask?.id === task.id) this.handleCloseTask(task);
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
