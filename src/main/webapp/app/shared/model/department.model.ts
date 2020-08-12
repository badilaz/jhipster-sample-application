import { IEmployee } from 'app/shared/model/employee.model';
import { ILocation } from 'app/shared/model/location.model';

export interface IDepartment {
  id?: number;
  departmentName?: string;
  employees?: IEmployee[];
  location?: ILocation;
}

export const defaultValue: Readonly<IDepartment> = {};
