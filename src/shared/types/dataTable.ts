export interface IDataSort {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}

export interface IPageable {
  paged: boolean;
  unpaged: boolean;
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort: IDataSort | [];
}

export interface IContentAircraftTable {
  id: number;
  aircraftNumber: string;
  model: string;
  modelYear: number;
  flightRange: number;
}

export interface IContentTimeZoneTable {
  id: number;
  countryName: string;
  cityName: string;
  gmt: string;
  gmtWinter: string;
}

export interface IContentSeatsTableTransformed {
  id: number;
  flightId: number;
  seatId: number;
  fare: number;
  category: 'BUSINESS' | 'FIRST' | 'ECONOMY' | 'PREMIUM_ECONOMY';
  isSold: boolean;
  isRegistered: boolean;
  isBooked: boolean;
}

export interface IContentSeatsTable {
  id: number;
  fare: number;
  isRegistered: boolean;
  isSold: boolean;
  isBooked: boolean;
  flightId: number;
  seat: {
    id: number;
    seatNumber: string;
    isNearEmergencyExit: boolean;
    isLockedBack: boolean;
    category: 'BUSINESS' | 'FIRST' | 'ECONOMY' | 'PREMIUM_ECONOMY';
    aircraftId: number;
  };
}

export interface IDataSource<T> {
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  numberOfElements: number;
  content: Array<T>;
  sort: Array<Partial<IDataSort>>;
  first: boolean;
  last: boolean;
  pageable: IPageable | string;
  empty: boolean;
}

export interface IColumnTableAntd<T> {
  title: string;
  dataIndex?: keyof T;
  key: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sorter?: boolean | ((a: T, b: T) => number);
  width?: number | string;
  align?: 'left' | 'right' | 'center';
}

export interface IContentDestinationTable {
  id: number;
  airportCode: string;
  timezone: string;
  countryName: string;
  cityName: string;
  airportName: string;
}
