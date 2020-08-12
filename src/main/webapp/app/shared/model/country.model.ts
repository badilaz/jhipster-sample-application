import { IRegion } from 'app/shared/model/region.model';

export interface ICountry {
  id?: number;
  countryName?: string;
  regions?: IRegion[];
}

export const defaultValue: Readonly<ICountry> = {};
