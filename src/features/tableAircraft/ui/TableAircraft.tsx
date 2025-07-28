import { HolderOutlined, PlusOutlined } from '@ant-design/icons';
import { TableHeader } from '@entities/tableHeader';
import type { IColumnTableAntd } from '@shared/types';
import type { IContentAircraftTable } from '@shared/types';
import { Table } from '@shared/ui/table';
import { Button } from 'antd';

import { type FC, useCallback } from 'react';

import { aircraftMock } from '../models/aircraft.mock';
import styles from './TableAircraft.module.scss';

const DragHandle: FC = () => {
  return <Button type="text" size="small" icon={<HolderOutlined />} />;
};

export const TableAircraft = () => {
  const handleBtnClick = useCallback(() => {
    console.log('open modal');
  }, []);

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

  return (
    <div className={styles.wrapper}>
      <TableHeader
        title="Самолёты"
        btnName="Добавить самолеты"
        btnIcon={<PlusOutlined style={{ marginLeft: '8px' }} />}
        onBtnClick={handleBtnClick}
        className={styles.customHeader}
      />

      <Table<IContentAircraftTable>
        dataSource={aircraftMock.content}
        columns={columns}
        rowKey="id"
        pagination={{
          current: aircraftMock.number + 1,
          pageSize: aircraftMock.size,
          total: aircraftMock.totalElements,
        }}
      />
    </div>
  );
};
