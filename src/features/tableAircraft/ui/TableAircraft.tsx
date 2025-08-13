import { TableHeader } from '@entities/tableHeader';
import { DEFAULT_PAGE_LIMIT } from '@shared/config/pagination';
import type { IColumnTableAntd, IContentAircraftTable } from '@shared/types';
import { Table } from '@shared/ui/table';
import { useTableEditor, type ValidationResult } from '@entities/table/lib/hooks/useTableEditor';
import { Input, Space, Button, Spin} from 'antd';
import { MoreHorizontal, Pencil, X } from 'lucide-react';
import { EditOutlined, SaveOutlined, CloseOutlined, PlusOutlined, HolderOutlined } from '@ant-design/icons';
import { type FC, useState, useEffect, useCallback } from 'react';
import {
  useGetAircraftListQuery,
  useUpdateAircraftMutation
} from '@features/tableAircraft/models/aircraftAPI.ts';
import {
  ContextMenu,
  useContextMenu,
} from '@shared/ui/contexMenu';
import styles from './TableAircraft.module.scss';

const validateAircraft = (data: Partial<IContentAircraftTable>): ValidationResult => {
  const errors: string[] = [];

  if (data.aircraftNumber !== undefined) {
    const trimmed = data.aircraftNumber.trim();
    if (trimmed.length < 4 || trimmed.length > 15) {
      errors.push('Номер самолёта должен содержать от 4 до 15 символов');
    }
  }

  if (data.modelYear !== undefined) {
    if (data.modelYear <= 2000) {
      errors.push('Год выпуска должен быть позже 2000');
    }
    if (data.modelYear > new Date().getFullYear()) {
      errors.push('Год выпуска не может быть в будущем');
    }
  }

  if (data.flightRange !== undefined) {
    if (data.flightRange <= 0) {
      errors.push('Дальность полета должна быть больше 0');
    }
    if (data.flightRange > 50000) {
      errors.push('Дальность полета не может превышать 50,000 км');
    }
  }

  if (data.model !== undefined) {
    const trimmed = data.model.trim();
    if (trimmed.length === 0) {
      errors.push('Модель не может быть пустой');
    }
    if (trimmed.length > 50) {
      errors.push('Модель не может превышать 50 символов');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const TableAircraft: FC = () => {
  const { contextData, open, close } = useContextMenu<IContentAircraftTable>();

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
    validator: validateAircraft,
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
              placeholder="до 50 символов"
              maxLength={50}
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
              placeholder="4-15 символов"
              maxLength={15}
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
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^\d+$/.test(value)) {
                  handleInputChange('modelYear', value === '' ? 0 : Number(value));
                }
              }}
              size="small"
              status={getInputStatus('modelYear')}
              placeholder="> 2000 г."
              type="number"
              min={2001}
              max={new Date().getFullYear()}
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
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^\d+$/.test(value)) {
                  handleInputChange('flightRange', value === '' ? 0 : Number(value));
                }
              }}
              size="small"
              status={getInputStatus('flightRange')}
              placeholder=" > 50,000 км"
              type="number"
              min={1}
              max={50000}
            />
          );
        }
        return text;
      },
    },
    {
      key: 'actions',
      title: '',
      width: 50,
      align: 'center',
      render: (_, row) => (
        <Button type="text" size="small" icon={<HolderOutlined />} onClick={(e) => open(e, row)} />
      ),
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
              title="Сохранить изменения"
            />
            <Button
              type="link"
              size="small"
              icon={<CloseOutlined />}
              onClick={cancel}
              title="Отменить изменения"
            />
          </Space>
        ) : (
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            disabled={editingKey !== null}
            onClick={() => edit(record)}
            title="Редактировать"
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

      {contextData && (
        <ContextMenu
          x={contextData.x}
          y={contextData.y}
          onClose={close}
          items={[
            {
              label: 'Подробности',
              icon: <MoreHorizontal size={16} />,
              onClick: () => console.log('Подробности', contextData.data),
            },
            {
              label: 'Редактировать',
              icon: <Pencil size={16} />,
              onClick: () => console.log('Редактировать', contextData.data),
            },
            {
              label: 'Удалить',
              icon: <X size={16} />,
              onClick: () => console.log('Удалить', contextData.data),
            },
          ]}
        />
      )}
    </div>
  );
};
