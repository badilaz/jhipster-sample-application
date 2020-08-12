import { ITask } from 'app/shared/model/task.model';
import { ICustomer } from 'app/shared/model/customer.model';

export interface IProject {
  id?: number;
  name?: string;
  code?: string;
  tasks?: ITask[];
  customer?: ICustomer;
}

export const defaultValue: Readonly<IProject> = {};
