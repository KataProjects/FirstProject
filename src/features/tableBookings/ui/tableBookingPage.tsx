import { useState } from 'react';
import { Table } from '@shared/ui/table';
import { TableHeader } from '@entities/tableHeader';
import { formatDateTime } from '@shared/lib/date/formatters';
import { Pagination } from 'antd';
import { useGetBookingsQuery } from '@features/tableBookings/models/bookingsApi'; // ✅ подключи сюда свой API

export const TableBookingPage = () => {
  const [page, setPage] = useState(0);
  const size = 10;

  const { data, isLoading } = useGetBookingsQuery({ page, size });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Дата бронирования',
      dataIndex: 'bookingDate',
      key: 'bookingDate',
      render: (text: string) => <span>{formatDateTime(text)}</span>,
    },
    {
      title: 'Идентификатор пассажира',
      dataIndex: 'passengerId',
      key: 'passengerId',
    },
    {
      title: 'Идентификатор рейса',
      dataIndex: 'flightId',
      key: 'flightId',
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <TableHeader
        title="Бронирование"
        btnName="Забронировать"
        onBtnClick={() => {
          console.log('Забронировать click');
        }}
      />

      <Table
        dataSource={data?.content || []}
        columns={columns}
        loading={isLoading}
        pagination={false}
        rowKey="id"
      />

      <Pagination
        current={page + 1}
        pageSize={size}
        total={data?.totalElements || 0}
        onChange={(p) => setPage(p - 1)}
        showSizeChanger={false}
        style={{ marginTop: 16 }}
      />
    </div>
    
  );
};
