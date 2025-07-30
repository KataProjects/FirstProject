import { MyTable } from '@shared/ui/table/ui/Table.tsx';
import { mockFlights } from '../model/mokData.ts';
import type { IColumnTableAntd, IFlight } from '@shared/types';

const columns: Array<IColumnTableAntd<IFlight>> = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Код', dataIndex: 'code', key: 'code' },
  {
    title: 'Откуда',
    dataIndex: 'airportFrom',
    key: 'airportFrom',
    render: (value) => value ?? '—',
  },
  { title: 'Куда', dataIndex: 'airportTo', key: 'airportTo' },
  {
    title: 'Вылет',
    dataIndex: 'departureDateTime',
    key: 'departureDateTime',
    render: (value) => new Date(value).toLocaleString(),
  },
  {
    title: 'Прилет',
    dataIndex: 'arrivalDateTime',
    key: 'arrivalDateTime',
    render: (value) => new Date(value).toLocaleString(),
  },
  { title: 'Самолёт', dataIndex: 'aircraftId', key: 'aircraftId' },
  { title: 'Статус', dataIndex: 'flightStatus', key: 'flightStatus' },
];

export const FlightsTable = () => {
  return (
    <MyTable
      dataSource={mockFlights.content}
      columns={columns}
      rowKey="id"
    />
  );
};