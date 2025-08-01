import { HolderOutlined, PlusOutlined } from '@ant-design/icons';
import { TableHeader } from '@entities/tableHeader';
import type { IColumnTableAntd } from '@shared/types';
import type { IContentDestinationTable } from '@shared/types';
import { Table } from '@shared/ui/table';
import { Button } from 'antd';

import { type FC, useCallback } from 'react';

import { destinationMock } from '../models/destination.mock';
import styles from './TableDestination.module.scss';

const DragHandle: FC = () => {
  return <Button type="text" size="small" icon={<HolderOutlined />} />;
};

export const TableDestination = () => {
  const handleBtnClick = useCallback(() => {
    console.log('open modal');
  }, []);

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

  return (
    <div className={styles.wrapper}>
      <TableHeader
        title="Место назначения"
        btnName="Добавить пункт назначения"
        btnIcon={<PlusOutlined style={{ marginLeft: '8px' }} />}
        onBtnClick={handleBtnClick}
        className={styles.customHeader}
      />

      <Table<IContentDestinationTable>
        dataSource={destinationMock.content}
        columns={columns}
        rowKey="id"
        pagination={{
          position: ['bottomLeft'],
          showSizeChanger: false,
          current: destinationMock.number + 1,
          pageSize: destinationMock.size,
          total: destinationMock.totalElements,
        }}
      />
    </div>
  );
};
