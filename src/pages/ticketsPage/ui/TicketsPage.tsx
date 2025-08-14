import { type Ticket, ticketsMockData } from '@entities/ticket';
import { formatDateTime } from '@shared/lib/date';
import { Table } from '@shared/ui/table';
import { Button } from 'antd';

import { formatDateTime } from '@shared/lib/date';
import { ticketsMockData, type Ticket } from '@entities/Ticket';


const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'ФИО',
    render: (record: Ticket) => `${record.lastName} ${record.firstName}`,
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
    render: (record: Ticket) => formatDateTime(record.departureDateTime),
  },
  {
    title: 'Прилёт',
    render: (record: Ticket) => formatDateTime(record.arrivalDateTime),
  },
  {
    title: 'Номер посадки',
    dataIndex: 'flightSeatId',
  },
];

export const TicketsPage = () => {
  return (
    <div>
      <div className="flex justify-between mb-[15px]">
        <h1 className="text-[20px] italic">Билеты</h1>
        <Button className="flex justify-start w-[200px] rounded-[1px] text-[14px] italic">
          Добавить билет +
        </Button>
      </div>
      <Table dataSource={ticketsMockData} columns={columns} />
    </div>
  );
};
