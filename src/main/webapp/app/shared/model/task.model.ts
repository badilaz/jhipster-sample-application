import { Moment } from 'moment';
import { IProject } from 'app/shared/model/project.model';

export interface ITask {
  id?: number;
  name?: string;
  code?: string;
  startDate?: string;
  endDate?: string;
  duration?: number;
  project?: IProject;
}

export const defaultValue: Readonly<ITask> = {};
