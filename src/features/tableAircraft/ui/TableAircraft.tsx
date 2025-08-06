import { PlusOutlined } from '@ant-design/icons';
import { TableHeader } from '@entities/tableHeader';
import { validateAircraftData } from '@features/tableAircraft/lib/validation.ts';
import { DEFAULT_PAGE_LIMIT } from '@shared/config/pagination';
import type { IColumnTableAntd, IContentAircraftTable } from '@shared/types';
import { Table } from '@shared/ui/table';
import { useTableEditor } from '@entities/table/lib/hooks/useTableEditor';
import { Input, Space, Button } from 'antd';
import { EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { type FC, useState, useEffect, useCallback } from 'react';
import {
  useGetAircraftListQuery,
  useUpdateAircraftMutation
} from '@features/tableAircraft/models/aircraftAPI';
import styles from './TableAircraft.module.scss';

export const TableAircraft: FC = () => {
  const [pagination, setPagination] = useState({
    page: 0,
    size: DEFAULT_PAGE_LIMIT,
  });

  const { data: aircraftList, isSuccess, isLoading, isError } = useGetAircraftListQuery({
    page: pagination.page,
    size: pagination.size,
  });

  const [updateAircraft] = useUpdateAircraftMutation();

  const {
    editingKey,
    editingData,
    isEditing,
    edit,
    cancel,
    save,
    handleInputChange,
    handleTableChange,
    getInputStatus
  } = useTableEditor<IContentAircraftTable>({
    data: aircraftList?.content || [],
    updateMutation: updateAircraft,
    validator: validateAircraftData,
    successMessage: 'Изменения сохранены на сервер',
    setPagination,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log('Получены данные:', aircraftList);
    }
  }, [isSuccess, aircraftList]);

  const handleBtnClick = useCallback(() => {
    console.log('open modal');
  }, []);

  const columns: Array<IColumnTableAntd<IContentAircraftTable>> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Модель',
      dataIndex: 'model',
      key: 'model',
      render: (text: string, record: IContentAircraftTable) => {
        if (isEditing(record)) {
          return (
            <Input
              value={editingData.model || ''}
              onChange={(e) => handleInputChange('model', e.target.value)}
              size="small"
              status={getInputStatus('model')}
              placeholder="Введите модель"
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Номер',
      dataIndex: 'aircraftNumber',
      key: 'aircraftNumber',
      render: (text: string, record: IContentAircraftTable) => {
        if (isEditing(record)) {
          return (
            <Input
              value={editingData.aircraftNumber || ''}
              onChange={(e) => handleInputChange('aircraftNumber', e.target.value)}
              size="small"
              status={getInputStatus('aircraftNumber')}
              placeholder="Введите номер"
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Год выпуска',
      dataIndex: 'modelYear',
      key: 'modelYear',
      render: (text: number, record: IContentAircraftTable) => {
        if (isEditing(record)) {
          return (
            <Input
              value={editingData.modelYear || ''}
              onChange={(e) => handleInputChange('modelYear', Number(e.target.value) || 0)}
              size="small"
              status={getInputStatus('modelYear')}
              placeholder="Год"
              type="number"
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Дальность полета (км)',
      dataIndex: 'flightRange',
      key: 'flightRange',
      render: (text: number, record: IContentAircraftTable) => {
        if (isEditing(record)) {
          return (
            <Input
              value={editingData.flightRange || ''}
              onChange={(e) => handleInputChange('flightRange', Number(e.target.value) || 0)}
              size="small"
              status={getInputStatus('flightRange')}
              placeholder="Дальность"
              type="number"
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 120,
      render: (_: any, record: IContentAircraftTable) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button
              type="link"
              size="small"
              icon={<SaveOutlined />}
              onClick={() => save(record.id)}
            />
            <Button
              type="link"
              size="small"
              icon={<CloseOutlined />}
              onClick={cancel}
            />
          </Space>
        ) : (
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            disabled={editingKey !== null}
            onClick={() => edit(record)}
          />
        );
      },
    },
  ];

  if (isLoading) return <Spin size="large" />;
  if (isError) return <div>Ошибка загрузки</div>;

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
        dataSource={aircraftList?.content || []}
        columns={columns}
        rowKey="id"
        onChange={handleTableChange}
        pagination={{
          position: ['bottomLeft'],
          showSizeChanger: false,
          current: pagination.page + 1,
          pageSize: pagination.size,
          total: aircraftList?.totalElements ?? 0,
        }}
      />
    </div>
  );
};
