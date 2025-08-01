import { HolderOutlined, PlusOutlined } from '@ant-design/icons';
import { TableHeader } from '@entities/tableHeader';
import { DEFAULT_PAGE_LIMIT } from '@shared/config/pagination';
import type { IColumnTableAntd } from '@shared/types';
import type { IContentDestinationTable } from '@shared/types';
import { Table } from '@shared/ui/table';
import { Button, Spin, type TablePaginationConfig } from 'antd';

import { type FC, useCallback, useEffect, useState } from 'react';

import { useGetDestinationListQuery } from '../models/destinationApi';
import styles from './TableDestination.module.scss';

const DragHandle: FC = () => {
  return <Button type="text" size="small" icon={<HolderOutlined />} />;
};

export const TableDestination = () => {
  const handleBtnClick = useCallback(() => {
    console.log('open modal');
  }, []);

  const [page, setPage] = useState(0);
  const { data, isSuccess, isLoading, isError } = useGetDestinationListQuery({
    page: page,
    size: DEFAULT_PAGE_LIMIT,
  });

  const handleTableChange = (pagination: TablePaginationConfig) => {
    if (pagination.current !== undefined) {
      setPage(pagination.current - 1);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
  }, [data]);

  const columns: Array<IColumnTableAntd<IContentDestinationTable>> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Страна',
      dataIndex: 'countryName',
      key: 'countryName',
    },
    {
      title: 'Город',
      dataIndex: 'cityName',
      key: 'cityName',
    },
    {
      title: 'Имя аэропорта',
      dataIndex: 'airportName',
      key: 'airportName',
    },
    {
      title: 'Часовой пояс',
      dataIndex: 'timezone',
      key: 'timezone',
    },
    {
      key: 'sort',
      title: '',
      width: 50,
      align: 'center',
      render: () => <DragHandle />,
    },
  ];

  return isLoading ? (
    <Spin size="large" />
  ) : isError ? (
    <div>Oops error</div>
  ) : isSuccess ? (
    <div className={styles.wrapper}>
      <TableHeader
        title="Место назначения"
        btnName="Добавить пункт назначения"
        btnIcon={<PlusOutlined style={{ marginLeft: '8px' }} />}
        onBtnClick={handleBtnClick}
        className={styles.customHeader}
      />

      <Table<IContentDestinationTable>
        dataSource={data?.content}
        columns={columns}
        rowKey="id"
        onChange={handleTableChange}
        pagination={{
          position: ['bottomLeft'],
          showSizeChanger: false,
          current: (data?.number ?? 0) + 1,
          pageSize: data?.size,
          total: data?.totalElements ?? 0,
        }}
      />
    </div>
  ) : null;
};
