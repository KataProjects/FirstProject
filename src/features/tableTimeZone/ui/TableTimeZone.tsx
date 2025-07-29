import { HolderOutlined, PlusOutlined } from '@ant-design/icons';
import { TableHeader } from '@entities/tableHeader';
import { useGetTimeZonesListQuery } from '@features/tableTimeZone/models/timeZoneApi';
import type { IColumnTableAntd } from '@shared/types';
import type { IContentTimeZoneTable } from '@shared/types';
import { Table } from '@shared/ui/table';
import { Button } from 'antd';

import { type FC, useCallback } from 'react';

import styles from './TableTimeZone.module.scss';

const DragHandle: FC = () => {
  return <Button type="text" size="small" icon={<HolderOutlined />} />;
};

export const TableTimeZone = () => {
  const { data, isLoading, error } = useGetTimeZonesListQuery();

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

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
        dataSource={data?.content}
        columns={columns}
        rowKey="id"
        pagination={{
          current: (data?.number ?? 0) + 1,
          pageSize: data?.size,
          total: data?.totalElements,
        }}
      />
    </div>
  );
};
