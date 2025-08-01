import { HolderOutlined, PlusOutlined } from '@ant-design/icons';
import { TableHeader } from '@entities/tableHeader';
import { useGetFlightSeatListQuery } from '@features/tableSeats/models/flightSeatApi';
import type { IColumnTableAntd } from '@shared/types';
import type { IContentSeatsTable } from '@shared/types';
import { Table } from '@shared/ui/table';
import { Button,  type TablePaginationConfig } from 'antd';
import { useState } from 'react';

import { type FC, useCallback } from 'react';

import styles from './TableTimeZone.module.scss';

const DragHandle: FC = () => {
  return <Button type="text" size="small" icon={<HolderOutlined />} />;
};

export const TableSeats = () => {

  const [page, setPage] = useState(0);
  const { data, isLoading, error } = useGetFlightSeatListQuery(page);

    const handleTableChange = (pagination: TablePaginationConfig) => {
    if (pagination.current !== undefined) {
      setPage(pagination.current - 1);  
    }
  };
  

  const handleBtnClick = useCallback(() => {
    console.log('open modal');
  }, []);

  const columns: Array<IColumnTableAntd<IContentSeatsTable>> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'ID рейса',
      dataIndex: 'flightsId',
      key: 'flightsId',
    },
    {
      title: 'ID места',
      dataIndex: 'seatId',
      key: 'seatId',
    },
    {
      title: 'Цена',
      dataIndex: 'fare',
      key: 'fare',
    },
    {
      title: 'Класс',
      dataIndex: 'category',
      key: 'category',
    },
        {
      title: 'Продано',
      dataIndex: 'isSold',
      key: 'isSold',
    },
        {
      title: 'Зарегистрировано',
      dataIndex: 'isRegistered',
      key: 'isRegistered',
    },
        {
      title: 'Забронировано',
      dataIndex: 'isBooked',
      key: 'isBooked',
    },
    {
      key: 'sort',
      title: '',
      width: 50,
      align: 'center',
      render: () => <DragHandle />,
    },
  ];


  if (isLoading || !data) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  if (!data) return <div>No data</div>;

  return (
    <div className={styles.wrapper}>
      <TableHeader
        title="Часовые пояса"
        btnName="Добавить часовой пояс"
        btnIcon={<PlusOutlined style={{ marginLeft: '8px' }} />}
        onBtnClick={handleBtnClick}
        className={styles.customHeader}
      />

      <Table<IContentSeatsTable>
        dataSource={data.content}
        columns={columns}
        rowKey="id"
        onChange={handleTableChange}
        pagination={{
          current: (data.number ?? 0) + 1,
          pageSize: data.size ?? 10,
          total: data.totalElements ?? 0,
        }}
      />
    </div>
  );
};