import { Table } from '@shared/ui/table';

const data = [{
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    address: '123 Main St, Anytown, USA',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
},
{
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1234567890',
    address: '123 Main St, Anytown, USA',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
},
]

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'City',
        dataIndex: 'city',
    },
    {
        title: 'State',
        dataIndex: 'state',
    },
    {
        title: 'Zip',
        dataIndex: 'zip',
    },
]

export const PassengersPage = () => {
    return (
        <div>
            <h1>Пассажиры</h1>
            <button>Добавить пассажира</button>
            <Table dataSource={data} columns={columns} />
        </div>
    )
}