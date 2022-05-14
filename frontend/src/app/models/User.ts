import { Task } from './Task';

export class User {
  id: number;
  name: string | null;
  email: string | null;
  randomUUID: string | null;
  password: string | null;
  tasks: Task[];
}
