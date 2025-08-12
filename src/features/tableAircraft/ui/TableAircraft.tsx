import { HolderOutlined } from '@ant-design/icons';
import { TableHeader } from '@entities/tableHeader';
import { DEFAULT_PAGE_LIMIT } from '@shared/config/pagination';
import type { IColumnTableAntd, IContentAircraftTable } from '@shared/types';
import { Table } from '@shared/ui/table';
import { Button, Spin, type TablePaginationConfig } from 'antd';

import { type FC, useCallback, useEffect, useState } from 'react';
import { useGetAircraftListQuery } from '@features/tableAircraft/models/aircraftApi.ts';
import { AddButton } from '@shared/ui/AddButton';
import styles from './TableAircraft.module.scss';

const DragHandle: FC = () => {
  return <Button type="text" size="small" icon={<HolderOutlined />} />;
};

export const TableAircraft: FC = () => {
  const [page, setPage] = useState(0);

  const { data: aircraftList, isSuccess, isLoading, isError } = useGetAircraftListQuery({
    page,
    size: DEFAULT_PAGE_LIMIT,
  });

  const handleBtnClick = useCallback(() => {
    console.log('open modal');
  }, []);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    if (pagination.current !== undefined) {
      setPage(pagination.current - 1);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(aircraftList);
    }
  }, [aircraftList, isSuccess]);

  const columns: Array<IColumnTableAntd<IContentAircraftTable>> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Модель',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Номер',
      dataIndex: 'aircraftNumber',
      key: 'aircraftNumber',
    },
    {
      title: 'Год выпуска',
      dataIndex: 'modelYear',
      key: 'modelYear',
    },
    {
      title: 'Дальность полета (км)',
      dataIndex: 'flightRange',
      key: 'flightRange',
    },
    {
      key: 'sort',
      title: '',
      width: 50,
      align: 'center',
      render: () => <DragHandle />,
    },
  ];

  if (isLoading) return <Spin size="large" />;
  if (isError) return <div>Ошибка загрузки</div>;

  return isSuccess ? (
    <div className={styles.wrapper}>
      <TableHeader
        title="Самолёты"
        extraContent={<AddButton text="Добавить самолеты" onClick={handleBtnClick} />}
        className={styles.customHeader}
      />

      <Table<IContentAircraftTable>
        dataSource={aircraftList?.content ?? []}
        columns={columns}
        rowKey="id"
        onChange={handleTableChange}
        pagination={{
          position: ['bottomLeft'],
          showSizeChanger: false,
          current: (aircraftList?.number ?? 0) + 1,
          pageSize: aircraftList?.size,
          total: aircraftList?.totalElements ?? 0,
        }}
      />
    </div>
  ) : null;
};