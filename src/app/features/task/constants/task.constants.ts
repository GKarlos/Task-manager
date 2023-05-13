import { Task } from '@task/models/task';

export const TEST_TASK: Task = {
  title: 'Test task title',
  description: 'Test task description',
  id: '123',
  isComplete: false,
};

export const EMPTY_TASK: Task = {
  title: '',
  description: '',
  id: '',
  isComplete: false,
};
