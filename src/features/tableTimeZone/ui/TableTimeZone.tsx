import { HolderOutlined, PlusOutlined } from '@ant-design/icons';
import { TableHeader } from '@entities/tableHeader';
import { useGetTimeZonesListQuery } from '@features/tableTimeZone/models/timeZoneApi';
import type { IColumnTableAntd } from '@shared/types';
import type { IContentTimeZoneTable } from '@shared/types';
import { Table } from '@shared/ui/table';
import { Button,  type TablePaginationConfig } from 'antd';
import { useState } from 'react';

import { type FC, useCallback } from 'react';

import styles from './TableTimeZone.module.scss';

const DragHandle: FC = () => {
  return <Button type="text" size="small" icon={<HolderOutlined />} />;
};

export const TableTimeZone = () => {

  const [page, setPage] = useState(0);
  const { data, isLoading, error } = useGetTimeZonesListQuery(page);

    const handleTableChange = (pagination: TablePaginationConfig) => {
    if (pagination.current !== undefined) {
      setPage(pagination.current - 1);  
    }
  };
  

  const handleBtnClick = useCallback(() => {
    console.log('open modal');
  }, []);

  const columns: Array<IColumnTableAntd<IContentTimeZoneTable>> = [
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
      title: 'Среднее время по Гринвичу (GMT)',
      dataIndex: 'gmt',
      key: 'gmt',
    },
    {
      title: 'Зимнее среднее время по Гринвичу (GMT)',
      dataIndex: 'gmtWinter',
      key: 'gmtWinter',
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

      <Table<IContentTimeZoneTable>
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
