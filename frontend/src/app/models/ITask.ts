import { User } from './User';

export interface ITask {
  id: number;
  initialDate: Date;
  finishDate: Date;
  seconds: number;
  name?: string;
  user: User;
}
