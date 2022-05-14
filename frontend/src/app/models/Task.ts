import { User } from './User';

export class Task {
  id: number;
  initialDate: Date;
  finishDate: Date;
  seconds: number;
  name?: string;
  user: User;
}
