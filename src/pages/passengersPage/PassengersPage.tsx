import { Table } from '@shared/ui/table';

import { data } from './mockData';
import type { Passenger } from './dataTypes';

import { Button } from 'antd';

// Функция для форматирования даты
const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

const columns = [
    {
        title: 'iD',
        dataIndex: 'id',
    },
    {
        title: 'Имя, Фамилия, Отчество',
        render: (record: Passenger) => (
            `${record.firstName} ${record.lastName} ${record.passport.middleName}`
        ),
    },
    {
        title: 'Пол',
        render: ({ passport } : Passenger) => passport.gender === 'male' ? 'Муж.' : 'Жен.'
        
    },
    {
        title: 'Телефон',
        render: (record: Passenger) => {
            return `+${record.phoneNumber}`;
        }
    },
    {
        title: 'Дата рождения',
        render: (record: Passenger) => {
            return formatDate(record.birthDate);
        }

    },
    {
        title: 'Серийный номер',
        render: (record: Passenger) => {
            return record.passport.serialNumberPassport
        }
    },
    {
        title: 'Гражданство',
        render: (record: Passenger) => {
            return record.passport.passportIssuingCountry
        }
    },
    {
        title: 'Дата выдачи паспорта',
        render: (record: Passenger) => {
            return formatDate(record.passport.passportIssuingDate);
        }
    },
]   


export const PassengersPage = () => {
    return (
        <div>
            <div className='flex justify-between mb-[15px]'>
                <h1 className='text-[20px] italic'>Пассажиры</h1>
                <Button className='flex justify-start w-[200px] rounded-[1px] text-[14px] italic'>Добавить пассажира +</Button>
                </div>
            <Table<Passenger> dataSource={data} columns={columns} />
        </div>
    )
}