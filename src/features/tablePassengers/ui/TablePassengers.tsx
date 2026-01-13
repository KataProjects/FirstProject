import {
  CloseCircleOutlined,
  CloseOutlined,
  EditOutlined,
  LoadingOutlined,
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { TableHeader } from '@entities/tableHeader';
import { DEFAULT_PAGE_LIMIT } from '@shared/config/pagination';
import type { IContentPassengerTable, IPassportData } from '@shared/types';
import { Table } from '@shared/ui/table';
import {
  Button,
  DatePicker,
  Input,
  Result,
  Select,
  Space,
  Spin,
  type TablePaginationConfig,
  Tooltip,
} from 'antd';
import dayjs from 'dayjs';

import { useCallback, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { COUNTRIES_LIST } from '../constants/countries';
import {
  nameValidationRules,
  phoneValidationRules,
  serialNumberValidationRules,
} from '../constants/validationRules';
import { useGetPassengerListQuery, useUpdatePassengerMutation } from '../model/tablePassengersApi';
import styles from './tablePassengers.module.scss';

export const PassengersPage = () => {
  const [page, setPage] = useState(0);
  const {
    data: passengerList,
    isSuccess,
    isLoading: getPassengerLoading,
    isError: getPassengerError,
  } = useGetPassengerListQuery({
    page: page,
    size: DEFAULT_PAGE_LIMIT,
  });
  const [updatePassenger, { isLoading: isUpdating }] = useUpdatePassengerMutation();
  const [data, setData] = useState<IContentPassengerTable[]>([]);
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<{
    [key: number]: Partial<IContentPassengerTable>;
  }>({});
  const [updateError, setUpdateError] = useState(false);

  type DynamicFormFields = {
    [key: `lastName-${number}`]: string;
    [key: `firstName-${number}`]: string;
    [key: `phoneNumber-${number}`]: string;
    [key: `serialNumberPassport-${number}`]: string;
  };

  const {
    register,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<DynamicFormFields>();

  useEffect(() => {
    if (isSuccess && passengerList?.content) {
      setData(passengerList.content);
    }
  }, [passengerList, isSuccess]);

  const isEditing = (record: IContentPassengerTable) => record.id === editingKey;

  const edit = (record: IContentPassengerTable) => {
    setEditingKey(record.id);
    setEditingData((prev) => ({
      ...prev,
      [record.id]: {
        ...record,
        passport: {
          ...record.passport,
          middleName: record.passport.middleName === null ? undefined : record.passport.middleName,
        },
      },
    }));

    register(`lastName-${record.id}`, nameValidationRules);
    register(`firstName-${record.id}`, nameValidationRules);
    register(`phoneNumber-${record.id}`, phoneValidationRules);
    register(`serialNumberPassport-${record.id}`, serialNumberValidationRules);

    setValue(`lastName-${record.id}`, record.lastName);
    setValue(`firstName-${record.id}`, record.firstName);
    setValue(`phoneNumber-${record.id}`, record.phoneNumber);
    setValue(`serialNumberPassport-${record.id}`, record.passport.serialNumberPassport || '');
  };

  const cancel = () => {
    setEditingKey(null);
    setEditingData({});
  };

  const save = async (id: number) => {
    try {
      const isValid = await trigger([
        `lastName-${id}`,
        `firstName-${id}`,
        `phoneNumber-${id}`,
        `serialNumberPassport-${id}`,
      ]);

      if (!isValid) return;

      const dataToSave = editingData[id];
      if (!dataToSave) return;

      const originalRecord = data.find((item) => item.id === id);
      if (!originalRecord) return;

      const hasChanges = (Object.keys(dataToSave) as Array<keyof IContentPassengerTable>).some(
        (key) => {
          if (key === 'passport' && dataToSave.passport) {
            return (Object.keys(dataToSave.passport) as Array<keyof IPassportData>).some(
              (passportKey) =>
                dataToSave.passport?.[passportKey] !== originalRecord.passport[passportKey],
            );
          }
          return dataToSave[key] !== originalRecord[key];
        },
      );

      if (!hasChanges) {
        cancel();
        return;
      }

      const payload = {
        ...dataToSave,
        passport: {
          ...originalRecord.passport,
          ...dataToSave.passport,
          middleName:
            dataToSave.passport?.middleName === '' || dataToSave.passport?.middleName?.length === 1
              ? 'isAbsent'
              : dataToSave.passport?.middleName,
        },
      };

      await updatePassenger({ id, ...payload }).unwrap();
      setData((prev) => prev.map((item) => (item.id === id ? { ...item, ...payload } : item)));
      cancel();
    } catch (err) {
      setUpdateError(true);
      setTimeout(() => setUpdateError(false), 3000);
    }
  };

  const handleInputChange = useCallback((id: number, changes: Partial<IContentPassengerTable>) => {
    setEditingData((prev) => {
      const currentData = prev[id] || {};

      return {
        ...prev,
        [id]: {
          ...currentData,
          ...changes,
          passport: changes.passport
            ? { ...currentData.passport, ...changes.passport }
            : currentData.passport,
        },
      };
    });
  }, []);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    if (pagination.current !== undefined) {
      setPage(pagination.current - 1);
    }

    setEditingKey(null);
    setEditingData({});
  };

  const columns = [
    {
      title: 'iD',
      dataIndex: 'id',
    },
    {
      title: 'Фамилия, Имя, Отчество',
      render: (record: IContentPassengerTable) => {
        const editable = isEditing(record);
        const currentEditingData = editingData[record.id] || {};
        return editable ? (
          <div className={styles.nameInputs}>
            <Input
              {...register(`lastName-${record.id}`, nameValidationRules)}
              defaultValue={currentEditingData.lastName ?? record.lastName}
              onChange={async (e) => {
                const trimmedValue = e.target.value.slice(0, 15);
                setValue(`lastName-${record.id}`, trimmedValue);
                handleInputChange(record.id, { lastName: trimmedValue });
                await trigger(`lastName-${record.id}`);
              }}
              placeholder="Фамилия"
              status={errors[`lastName-${record.id}`] ? 'error' : ''}
            />
            {errors[`lastName-${record.id}`] && (
              <span className={styles.errorText}>{errors[`lastName-${record.id}`]?.message}</span>
            )}
            <Input
              {...register(`firstName-${record.id}`, nameValidationRules)}
              defaultValue={currentEditingData.firstName ?? record.firstName}
              onChange={async (e) => {
                const trimmedValue = e.target.value.slice(0, 15);
                setValue(`firstName-${record.id}`, trimmedValue);
                handleInputChange(record.id, { firstName: trimmedValue });
                await trigger(`firstName-${record.id}`);
              }}
              placeholder="Имя"
              status={errors[`firstName-${record.id}`] ? 'error' : ''}
            />
            {errors[`firstName-${record.id}`] && (
              <span className={styles.errorText}>{errors[`firstName-${record.id}`]?.message}</span>
            )}
            <Input
              value={
                (currentEditingData.passport?.middleName ?? record.passport.middleName) ===
                'isAbsent'
                  ? ''
                  : (currentEditingData.passport?.middleName ?? record.passport.middleName ?? '')
              }
              onChange={(e) => {
                const lettersOnly = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '');
                handleInputChange(record.id, {
                  passport: {
                    middleName: lettersOnly,
                  },
                });
              }}
              placeholder="Отчество (при наличии)"
            />
          </div>
        ) : (
          `${record.lastName} ${record.firstName} ${record.passport.middleName === 'isAbsent' ? '' : record.passport.middleName}`
        );
      },
    },
    {
      title: 'Пол',
      render: (record: IContentPassengerTable) => {
        const editable = isEditing(record);
        const currentEditingData = editingData[record.id] || {};
        const currentGender = currentEditingData.passport?.gender ?? record.passport.gender;
        return editable ? (
          <Select
            value={currentGender}
            onChange={(value) =>
              handleInputChange(record.id, {
                passport: { ...currentEditingData.passport, gender: value },
              })
            }
            options={[
              { value: 'male', label: 'Муж.' },
              { value: 'female', label: 'Жен.' },
            ]}
          />
        ) : record.passport.gender === 'male' ? (
          'Муж.'
        ) : (
          'Жен.'
        );
      },
    },
    {
      title: 'Телефон',
      render: (record: IContentPassengerTable) => {
        const editable = isEditing(record);
        const currentEditingData = editingData[record.id] || {};
        return editable ? (
          <div>
            <Input
              {...register(`phoneNumber-${record.id}`, phoneValidationRules)}
              defaultValue={currentEditingData.phoneNumber ?? record.phoneNumber}
              onChange={async (e) => {
                const trimmedValue = e.target.value.slice(0, 15);
                setValue(`phoneNumber-${record.id}`, trimmedValue);
                handleInputChange(record.id, { phoneNumber: trimmedValue });
                await trigger(`phoneNumber-${record.id}`);
              }}
              placeholder="Телефон"
              status={errors[`phoneNumber-${record.id}`] ? 'error' : ''}
              addonBefore="+"
            />
            {errors[`phoneNumber-${record.id}`] && (
              <span className={styles.errorText}>
                {errors[`phoneNumber-${record.id}`]?.message}
              </span>
            )}
          </div>
        ) : (
          `+${record.phoneNumber}`
        );
      },
    },
    {
      title: 'Дата рождения',
      render: (record: IContentPassengerTable) => {
        const editable = isEditing(record);
        const currentEditingData = editingData[record.id] || {};
        const value = dayjs(currentEditingData.birthDate || record.birthDate, 'YYYY-MM-DD');
        return editable ? (
          <DatePicker
            key={`birth-date-${record.id}`}
            value={value?.isValid() ? value : null}
            onChange={(date) => {
              handleInputChange(record.id, {
                birthDate: date?.format('YYYY-MM-DD') || '',
              });
            }}
            format="DD.MM.YYYY"
            allowClear={false}
            disabledDate={(current) => current && current > dayjs().endOf('day')}
          />
        ) : value?.isValid() ? (
          value.format('DD.MM.YYYY')
        ) : (
          'Не указана'
        );
      },
    },
    {
      title: 'Серийный номер',
      render: (record: IContentPassengerTable) => {
        const editable = isEditing(record);
        const currentEditingData = editingData[record.id] || {};
        return editable ? (
          <div>
            <Input
              {...register(`serialNumberPassport-${record.id}`, serialNumberValidationRules)}
              defaultValue={
                currentEditingData.passport?.serialNumberPassport ??
                record.passport.serialNumberPassport
              }
              onChange={async (e) => {
                const trimmedValue = e.target.value.slice(0, 15);
                setValue(`serialNumberPassport-${record.id}`, trimmedValue);
                handleInputChange(record.id, {
                  passport: {
                    ...currentEditingData.passport,
                    serialNumberPassport: trimmedValue,
                  },
                });
                await trigger(`serialNumberPassport-${record.id}`);
              }}
              placeholder="Серия и номер паспорта"
              status={errors[`serialNumberPassport-${record.id}`] ? 'error' : ''}
            />
            {errors[`serialNumberPassport-${record.id}`] && (
              <span className={styles.errorText}>
                {errors[`serialNumberPassport-${record.id}`]?.message}
              </span>
            )}
          </div>
        ) : (
          record.passport.serialNumberPassport
        );
      },
    },
    {
      title: 'Гражданство',
      render: (record: IContentPassengerTable) => {
        const editable = isEditing(record);
        const currentEditingData = editingData[record.id] || {};
        return editable ? (
          <Select
            value={currentEditingData.passport?.passportIssuingCountry}
            onChange={(value) =>
              handleInputChange(record.id, {
                passport: { ...currentEditingData.passport, passportIssuingCountry: value },
              })
            }
            options={COUNTRIES_LIST}
            style={{ width: '115%' }}
          />
        ) : (
          record.passport.passportIssuingCountry
        );
      },
    },
    {
      title: 'Дата выдачи паспорта',
      render: (record: IContentPassengerTable) => {
        const editable = isEditing(record);
        const currentEditingData = editingData[record.id] || {};
        const birthDate = dayjs(currentEditingData.birthDate || record.birthDate, 'YYYY-MM-DD');
        const value = dayjs(
          currentEditingData.passport?.passportIssuingDate || record.passport.passportIssuingDate,
          'YYYY-MM-DD',
        );

        return editable ? (
          <DatePicker
            key={`issue-date-${record.id}`}
            value={value?.isValid() ? value : null}
            onChange={(date) => {
              handleInputChange(record.id, {
                passport: {
                  ...currentEditingData.passport,
                  passportIssuingDate: date?.format('YYYY-MM-DD') || '',
                },
              });
            }}
            format="DD.MM.YYYY"
            allowClear={false}
            disabledDate={(current) => {
              return birthDate?.isValid() ? current && current < birthDate.endOf('day') : false;
            }}
          />
        ) : value?.isValid() ? (
          value.format('DD.MM.YYYY')
        ) : (
          'Не указана'
        );
      },
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 120,
      render: (_: any, record: IContentPassengerTable) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            {updateError ? (
              <Tooltip title="Ошибка сохранения. Попробуйте снова">
                <span style={{ color: '#ff4d4f', fontSize: '16px', padding: '0 8px' }}>
                  <CloseCircleOutlined />
                </span>
              </Tooltip>
            ) : (
              <Button
                type="link"
                size="small"
                icon={isUpdating ? <LoadingOutlined /> : <SaveOutlined />}
                onClick={() => save(record.id)}
                disabled={isUpdating}
              />
            )}
            <Button
              type="link"
              size="small"
              icon={<CloseOutlined />}
              onClick={cancel}
              disabled={isUpdating}
            />
          </Space>
        ) : (
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            disabled={editingKey !== null || isUpdating}
            onClick={() => edit(record)}
          />
        );
      },
    },
  ];

  return (
    <div className={styles.wrapper}>
      {getPassengerLoading ? (
        <div className={styles.fullPageLoader}>
          <Spin size="large" tip="Загрузка данных пассажиров..." />
        </div>
      ) : getPassengerError ? (
        <Result
          status="error"
          title="Ошибка загрузки"
          subTitle="Не удалось загрузить список пассажиров"
          extra={[
            <Button type="primary" key="reload" onClick={() => window.location.reload()}>
              Повторить попытку
            </Button>,
          ]}
          className={styles.fullPageError}
        />
      ) : (
        <>
          <TableHeader
            title="Пассажиры"
            btnName="Добавить пассажира"
            btnIcon={<PlusOutlined style={{ marginLeft: '8px' }} />}
            className={styles.customHeader}
          />
          <Table<IContentPassengerTable>
            dataSource={passengerList?.content}
            columns={columns}
            onChange={handleTableChange}
            pagination={{
              position: ['bottomLeft'],
              showSizeChanger: false,
              current: (passengerList?.number ?? 0) + 1,
              pageSize: passengerList?.size,
              total: passengerList?.totalElements ?? 0,
            }}
          />
        </>
      )}
    </div>
  );
};
