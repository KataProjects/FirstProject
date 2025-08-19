import { PlusOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { TableHeader } from '@entities/tableHeader';
import { DEFAULT_PAGE_LIMIT } from '@shared/config/pagination';
import type { IColumnTableAntd, IFlight } from '@shared/types';
import { Table } from '@shared/ui/table';
import { useTableEditor, type ValidationResult } from '@entities/table/lib/hooks/useTableEditor.ts';
import { Input, Space, Button, Spin, Select, DatePicker, InputNumber, type TablePaginationConfig } from 'antd';
import { type FC, useCallback, useEffect, useState } from 'react';
import { FLIGHT_STATUS_MAP, type FlightStatusKey } from '@entities/flights/constants/FlightStatuses.ts';
import moment from 'moment';
import {
  useGetFlightsListQuery,
  useUpdateFlightMutation,
  useGetFlightStatusesQuery
} from '../models/flightsAPI';
import styles from './TableFlights.module.scss';

const validateFlight = (data: Partial<IFlight>): ValidationResult => {
  const errors: string[] = [];

  if (data.code !== undefined) {
    const trimmed = data.code.trim();
    if (trimmed.length === 0) {
      errors.push('Код рейса не может быть пустым');
    }
    if (trimmed.length > 20) {
      errors.push('Код рейса не может превышать 20 символов');
    }
  }

  if (data.airportFrom !== undefined && data.airportFrom !== null) {
    const trimmed = data.airportFrom.trim();
    if (trimmed.length > 0 && !/^[A-Z]{3}$/.test(trimmed)) {
      errors.push('Код аэропорта отправления должен содержать 3 заглавные латинские буквы');
    }
  }

  if (data.airportTo !== undefined) {
    const trimmed = data.airportTo.trim();
    if (trimmed.length === 0) {
      errors.push('Аэропорт назначения не может быть пустым');
    }
    if (!/^[A-Z]{3}$/.test(trimmed)) {
      errors.push('Код аэропорта назначения должен содержать 3 заглавные латинские буквы');
    }
  }

  if (data.aircraftId !== undefined) {
    if (data.aircraftId <= 0) {
      errors.push('ID самолёта должен быть больше 0');
    }
  }

  if (data.departureDateTime && data.arrivalDateTime) {
    const departure = new Date(data.departureDateTime);
    const arrival = new Date(data.arrivalDateTime);
    if (departure >= arrival) {
      errors.push('Время прилёта должно быть позже времени вылета');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const TableFlights: FC = () => {
  const [page, setPage] = useState(0);

  const { data: flightsList, isSuccess, isLoading, isError } = useGetFlightsListQuery({
    page,
    size: DEFAULT_PAGE_LIMIT,
  });

  const { data: flightStatuses } = useGetFlightStatusesQuery();

  const [updateFlight] = useUpdateFlightMutation();

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
  } = useTableEditor<IFlight>({
    data: flightsList?.content || [],
    updateMutation: updateFlight,
    validator: validateFlight,
    successMessage: 'Изменения сохранены на сервер',
    setPagination,
  });

  const handleTableChangeLocal = (pagination: TablePaginationConfig) => {
    if (pagination.current !== undefined) {
      setPage(pagination.current - 1);
    }
    handleTableChange(pagination);
  };

  const handleBtnClick = useCallback(() => {
    console.log('open modal');
  }, []);

  useEffect(() => {
    if (isSuccess) {
      console.log(flightsList);
    }
  }, [flightsList, isSuccess]);

  const columns: Array<IColumnTableAntd<IFlight>> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Код (Рейс)',
      dataIndex: 'code',
      key: 'code',
      render: (text: string, record: IFlight) => {
        if (isEditing(record)) {
          return (
            <Input
              value={editingData.code || ''}
              onChange={(e) => handleInputChange('code', e.target.value)}
              size="small"
              status={getInputStatus('code')}
              placeholder="Код рейса"
              maxLength={20}
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Аэропорт отправления',
      dataIndex: 'airportFrom',
      key: 'airportFrom',
      render: (text: string | null, record: IFlight) => {
        if (isEditing(record)) {
          return (
            <Input
              value={editingData.airportFrom || ''}
              onChange={(e) => {
                const value = e.target.value.toUpperCase();
                if (value.length <= 3 && (/^[A-Z]*$/.test(value) || value === '')) {
                  handleInputChange('airportFrom', value);
                }
              }}
              size="small"
              status={getInputStatus('airportFrom')}
              placeholder="3 буквы"
              maxLength={3}
            />
          );
        }
        return text ?? '—';
      },
    },
    {
      title: 'Аэропорт прибытия',
      dataIndex: 'airportTo',
      key: 'airportTo',
      render: (text: string, record: IFlight) => {
        if (isEditing(record)) {
          return (
            <Input
              value={editingData.airportTo || ''}
              onChange={(e) => {
                const value = e.target.value.toUpperCase();
                if (value.length <= 3 && /^[A-Z]*$/.test(value)) {
                  handleInputChange('airportTo', value);
                }
              }}
              size="small"
              status={getInputStatus('airportTo')}
              placeholder="3 буквы"
              maxLength={3}
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Дата отбытия',
      dataIndex: 'departureDateTime',
      key: 'departureDateTime',
      render: (text: string, record: IFlight) => {
        if (isEditing(record)) {
          return (
            <DatePicker
              showTime
              value={editingData.departureDateTime ? moment(editingData.departureDateTime) : null}
              onChange={(date) => handleInputChange('departureDateTime', date ? date.toISOString() : '')}
              size="small"
              status={getInputStatus('departureDateTime')}
              format="DD.MM.YYYY HH:mm"
              placeholder="ДД.ММ.ГГГГ ЧЧ:мм"
            />
          );
        }
        return moment(text).format('DD.MM.YYYY HH:mm');
      },
    },
    {
      title: 'Дата прибытия',
      dataIndex: 'arrivalDateTime',
      key: 'arrivalDateTime',
      render: (text: string, record: IFlight) => {
        if (isEditing(record)) {
          return (
            <DatePicker
              showTime
              value={editingData.arrivalDateTime ? moment(editingData.arrivalDateTime) : null}
              onChange={(date) => handleInputChange('arrivalDateTime', date ? date.toISOString() : '')}
              size="small"
              status={getInputStatus('arrivalDateTime')}
              format="DD.MM.YYYY HH:mm"
              placeholder="ДД.ММ.ГГГГ ЧЧ:мм"
            />
          );
        }
        return moment(text).format('DD.MM.YYYY HH:mm');
      },
    },
    {
      title: 'Модель самолета',
      dataIndex: 'aircraftId',
      key: 'aircraftId',
      render: (text: number, record: IFlight) => {
        if (isEditing(record)) {
          return (
            <InputNumber
              value={editingData.aircraftId || null}
              onChange={(value) => handleInputChange('aircraftId', value || 0)}
              size="small"
              status={getInputStatus('aircraftId')}
              placeholder="ID"
              min={1}
              style={{ width: '100%' }}
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Статус',
      dataIndex: 'flightStatus',
      key: 'flightStatus',
      render: (text: FlightStatusKey, record: IFlight) => {
        if (isEditing(record)) {
          return (
            <Select
              value={editingData.flightStatus || text}
              onChange={(value) => handleInputChange('flightStatus', value)}
              size="small"
              status={getInputStatus('flightStatus')}
              placeholder="Выберите статус"
              style={{ width: '100%' }}
            >
              {flightStatuses?.map((status: string) => (
                <Select.Option key={status} value={status}>
                  {FLIGHT_STATUS_MAP[status as FlightStatusKey] || status}
                </Select.Option>
              ))}
            </Select>
          );
        }
        return FLIGHT_STATUS_MAP[text] || text;
      },
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 120,
      render: (_: any, record: IFlight) => {
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

  return isSuccess ? (
    <div className={styles.wrapper}>
      <TableHeader
        title="Рейсы"
        btnName="Добавить рейс"
        btnIcon={<PlusOutlined style={{ marginLeft: '8px' }} />}
        onBtnClick={handleBtnClick}
        className={styles.customHeader}
      />

      <Table<IFlight>
        dataSource={flightsList?.content ?? []}
        columns={columns}
        rowKey="id"
        onChange={handleTableChangeLocal}
        pagination={{
          position: ['bottomLeft'],
          showSizeChanger: false,
          current: (flightsList?.number ?? 0) + 1,
          pageSize: flightsList?.size,
          total: flightsList?.totalElements ?? 0,
        }}
      />
    </div>
  ) : null;
};