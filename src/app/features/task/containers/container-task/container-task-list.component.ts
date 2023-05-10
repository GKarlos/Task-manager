import { Component } from '@angular/core';
import { TEST_TASK } from '../../constants/task-testing.constants';

@Component({
  selector: 'app-container-task-list',
  templateUrl: './container-task-list.component.html',
  styleUrls: ['./container-task-list.component.scss'],
})
export class ContainerTaskListComponent {
  TEST_TASK = TEST_TASK;
}
