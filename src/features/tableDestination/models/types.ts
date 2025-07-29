export type IDataSource = {
  content: IContentAircraftTable[];
  pageable: string;
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  sort: string[];
  first: boolean;
  empty: boolean;
};

export interface IContentAircraftTable {
  id: number;
  airportCode: string;
  timezone: string;
  countryName: string;
  cityName: string;
  airportName: string;
}
