import { Component } from '@angular/core';
import { TEST_TASK } from '@task/constants/task-testing.constants';
import { Task } from '@task/models/task';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
})
export class TaskBoardComponent {
  tasks: Task[] = [TEST_TASK];

  handleAddTask(task: Task) {
    this.tasks.push(task);
  }

  handleEditTask(task: Task) {
    const taskIndex = this.tasks.findIndex((t) => t.id === task.id);
    if (taskIndex >= 0) {
      this.tasks[taskIndex] = task;
    }
  }

  handleDeleteTask(task: Task) {
    const taskIndex = this.tasks.findIndex((t) => t.id === task.id);
    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
    }
  }
}
