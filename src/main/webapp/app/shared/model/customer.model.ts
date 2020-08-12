import { ILocation } from 'app/shared/model/location.model';

export interface ICustomer {
  id?: number;
  name?: string;
  piva?: string;
  codFisc?: string;
  location?: ILocation;
}

export const defaultValue: Readonly<ICustomer> = {};
