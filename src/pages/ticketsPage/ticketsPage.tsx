import { Table } from '@shared/ui/table';
import { data } from './mockData';
import type { Ticket } from './dataTypes';
import { Button } from 'antd';
import moment from 'moment';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'ФИО',
    render: (record: Ticket) => (
      `${record.lastName} ${record.firstName}`
    ),
  },
  {
    title: 'Номер билета',
    dataIndex: 'ticketNumber',
  },
  {
    title: 'Код',
    dataIndex: 'flightCode',
  },
  {
    title: 'Отлёт',
    render: (record: Ticket) => {
      return moment(record.departureDateTime).format("YYYY-MM-DD, HH:mm");
    }
  },
  {
    title: 'Прилёт',
    render: (record: Ticket) => {
      return moment(record.arrivalDateTime).format("YYYY-MM-DD, HH:mm");
    }
  },
  {
    title: 'Номер посадки',
    dataIndex: 'flightSeatId',
  }
];

export const TicketsPage = () => {
  return (
    <div>
      <div className='flex justify-between mb-[15px]'>
        <h1 className='text-[20px] italic'>Билеты</h1>
        <Button className='flex justify-start w-[200px] rounded-[1px] text-[14px] italic'>
          Добавить билет +
        </Button>
      </div>
      <Table dataSource={data} columns={columns} />
    </div>
  )
}