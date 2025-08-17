import { Table } from "@shared/ui/table";
import { TableHeader } from "@entities/tableHeader";

import { bookingMockData } from "../models/bookingMockData";

import { formatDateTime } from "@shared/lib/date/formatters";

export const TableBookingPage = () => {

const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id"
    },
    {
        title: "Дата бронирования",
        dataIndex: "bookingDate",
        key: "bookingDate",
        render: (text: string) => {
            return <span>
              {formatDateTime(text)}
              </span>
        }
    },
    {
        title: "Идентификатор пассажира",
        dataIndex: "passengerId",
        key: "passengerId"
    },
    {
        title: "Идентификатор рейса",
        dataIndex: "flightId",
        key: "flightId"
    }
]

    return (
        <>
        <div className={`flex flex-col gap-4`}>
            <TableHeader title="Бронирование" btnName="Забронировать" onBtnClick={() => {console.log("Забронировать click")}}/>
            <Table dataSource={bookingMockData} columns={columns} />
        </div>
        </>
    )
}