import { HolderOutlined, PlusOutlined } from '@ant-design/icons';
import { DndProvider } from '@app/providers/DndProvider';
import { TableHeader } from '@entities/tableHeader';
import type { IColumnTableAntd } from '@shared/types';
import { Row, RowContext } from '@shared/ui/row';
import { Table } from '@shared/ui/table';
import { Button } from 'antd';

import { type FC, useCallback, useContext } from 'react';

import { aircraftMock } from '../models/aircraft.mock';
import type { IContentAircraftTable } from '../models/types';
import styles from './TableAircraft.module.scss';

const DragHandle: FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: 'move' }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

const COLUMNS: Array<IColumnTableAntd<IContentAircraftTable>> = [
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

export const TableAircraft = () => {
  const handleBtnClick = useCallback(() => {
    console.log('open modal');
  }, []);

  return (
    <div className={styles.wrapper}>
      <TableHeader
        title="Самолёты"
        btnName="Добавить самолеты"
        btnIcon={<PlusOutlined style={{ marginLeft: '8px' }} />}
        onBtnClick={handleBtnClick}
        className={styles.customHeader}
      />

      <DndProvider initialItems={aircraftMock.content}>
        {(items) => (
          <Table<IContentAircraftTable>
            dataSource={items as IContentAircraftTable[]}
            columns={COLUMNS}
            rowKey="id"
            pagination={{
              current: aircraftMock.number + 1,
              pageSize: aircraftMock.size,
              total: aircraftMock.totalElements,
            }}
            components={{ body: { row: Row } }}
          />
        )}
      </DndProvider>
    </div>
  );
};
