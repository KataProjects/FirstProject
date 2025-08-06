import { Table } from '@shared/ui/table';

import type { Passenger } from '@features/tablePassengers/ui/dataTypes'; 
import {data} from './mockData';
import { Button } from 'antd';
import moment from 'moment';

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
            const date = record.birthDate;
            return moment(date).format("DD.MM.YYYY");
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
            const date =  record.passport.passportIssuingDate;
            return moment(date).format("DD.MM.YYYY");
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