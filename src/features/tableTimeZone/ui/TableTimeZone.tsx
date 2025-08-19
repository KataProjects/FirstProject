import { HolderOutlined, PlusOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { TableHeader } from '@entities/tableHeader';
import { AddButton } from '@shared/ui/AddButton';
import { DEFAULT_PAGE_LIMIT } from '@shared/config/pagination';
import type { IColumnTableAntd, IContentTimeZoneTable } from '@shared/types';
import { Table } from '@shared/ui/table';
import { useTableEditorFullRecord, type ValidationResult } from '@entities/table';
import { Input, Space, Button, Spin, type TablePaginationConfig } from 'antd';
import { type FC, useState, useEffect, useCallback } from 'react';
import {
  useGetTimeZonesListQuery,
  useUpdateTimeZoneMutation
} from '@features/tableTimeZone/models/timeZoneApi';
import styles from './TableTimeZone.module.scss';

const validateGMT = (value: string): boolean => {
  const gmtRegex = /^GMT[+-](\d{1,2})(:([0-5][0-9]))?$/;
  return gmtRegex.test(value);
};

const validateTimeZone = (data: Partial<IContentTimeZoneTable>): ValidationResult => {
  const errors: string[] = [];

  if (data.countryName !== undefined) {
    const trimmed = data.countryName.trim();
    if (trimmed.length === 0) {
      errors.push('Обязательное поле');
    }
    if (trimmed.length > 50) {
      errors.push('< 50 символов');
    }
  }

  if (data.cityName !== undefined) {
    const trimmed = data.cityName.trim();
    if (trimmed.length === 0) {
      errors.push('Обязательное поле');
    }
    if (trimmed.length > 50) {
      errors.push('< 50 символов');
    }
  }

  if (data.gmt !== undefined) {
    const trimmed = data.gmt.trim();
    if (trimmed.length === 0) {
      errors.push('Обязательное поле');
    } else if (!validateGMT(trimmed)) {
      errors.push('Формат GMT±ч:мм');
    }
  }

  if (data.gmtWinter !== undefined) {
    const trimmed = data.gmtWinter.trim();
    if (trimmed.length === 0) {
      errors.push('Обязательное поле');
    } else if (!validateGMT(trimmed)) {
      errors.push('Формат GMT±ч:мм');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

const DragHandle: FC = () => {
  return <Button type="text" size="small" icon={<HolderOutlined />} />;
};

export const TableTimeZone: FC = () => {
  const [page, setPage] = useState(0);

  const { data: timeZonesList, isSuccess, isLoading, isError } = useGetTimeZonesListQuery({
    page,
    size: DEFAULT_PAGE_LIMIT,
  });

  const [updateTimeZone] = useUpdateTimeZoneMutation();

  const setPagination = useCallback((pagination: { page: number; size: number }) => {
    setPage(pagination.page);
  }, []);

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
  } = useTableEditorFullRecord<IContentTimeZoneTable>({
    data: timeZonesList?.content || [],
    updateMutation: updateTimeZone,
    validator: validateTimeZone,
    successMessage: 'Изменения сохранены на сервер',
    setPagination,
  });

  const handleTableChangeLocal = (pagination: TablePaginationConfig) => {
    if (pagination.current !== undefined) {
      setPage(pagination.current - 1);
    }
    handleTableChange(pagination);
  };

  useEffect(() => {
    if (isSuccess) {
      console.log('Получены данные:', timeZonesList);
    }
  }, [isSuccess, timeZonesList]);

  const handleBtnClick = useCallback(() => {
    console.log('open modal');
  }, []);

  const columns: Array<IColumnTableAntd<IContentTimeZoneTable>> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Страна',
      dataIndex: 'countryName',
      key: 'countryName',
      render: (text: string, record: IContentTimeZoneTable) => {
        if (isEditing(record)) {
          return (
            <Input
              value={editingData.countryName || ''}
              onChange={(e) => handleInputChange('countryName', e.target.value)}
              size="small"
              status={getInputStatus('countryName')}
              placeholder="< 50 символов"
              maxLength={50}
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Город',
      dataIndex: 'cityName',
      key: 'cityName',
      render: (text: string, record: IContentTimeZoneTable) => {
        if (isEditing(record)) {
          return (
            <Input
              value={editingData.cityName || ''}
              onChange={(e) => handleInputChange('cityName', e.target.value)}
              size="small"
              status={getInputStatus('cityName')}
              placeholder="< 50 символов"
              maxLength={50}
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Среднее время по Гринвичу (GMT)',
      dataIndex: 'gmt',
      key: 'gmt',
      render: (text: string, record: IContentTimeZoneTable) => {
        if (isEditing(record)) {
          return (
            <Input
              value={editingData.gmt || ''}
              onChange={(e) => handleInputChange('gmt', e.target.value)}
              size="small"
              status={getInputStatus('gmt')}
              placeholder="Формат GMT±ч:мм"
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Зимнее среднее время по Гринвичу (GMT)',
      dataIndex: 'gmtWinter',
      key: 'gmtWinter',
      render: (text: string, record: IContentTimeZoneTable) => {
        if (isEditing(record)) {
          return (
            <Input
              value={editingData.gmtWinter || ''}
              onChange={(e) => handleInputChange('gmtWinter', e.target.value)}
              size="small"
              status={getInputStatus('gmtWinter')}
              placeholder="Формат GMT±ч:мм"
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
      render: (_: any, record: IContentTimeZoneTable) => {
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
        title="Часовые пояса"
        extraContent={<AddButton text="Добавить часовой пояс" onClick={handleBtnClick} />}
        className={styles.customHeader}
      />

      <Table<IContentTimeZoneTable>
        dataSource={timeZonesList?.content || []}
        columns={columns}
        rowKey="id"
        onChange={handleTableChangeLocal}
        pagination={{
          position: ['bottomLeft'],
          showSizeChanger: false,
          current: (timeZonesList?.number ?? 0) + 1,
          pageSize: timeZonesList?.size,
          total: timeZonesList?.totalElements ?? 0,
        }}
      />
    </div>
  ) : null;
};