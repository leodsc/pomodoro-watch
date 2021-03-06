import { ITask } from './ITask';
import { User } from './User';

export class Task implements ITask {
  id: number;
  initialDate: Date;
  finishDate: Date;
  seconds: number;
  name?: string | undefined;
  user: User;
}
