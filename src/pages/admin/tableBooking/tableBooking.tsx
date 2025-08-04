import { Table } from "@shared/ui/table";
import { TableHeader } from "@entities/tableHeader";
import styles from "./tableBooking.module.css";
import { type bookingData } from "@shared/types/dataTable";

export const TableBooking = () => {


const bookingMockData: bookingData[] = [
    {
        id: 8,
        passengerId: 21,
        bookingDate: "2022-11-26T21:00:00",
        bookingStatus: "PAID",
        flightSeatId: 346,
        flightId: 349
    },
    {
        id: 9,
        passengerId: 22,
        bookingDate: "2022-11-26T21:00:00",
        bookingStatus: "PAID",
        flightSeatId: 347,
        flightId: 350
    }, 
    {
        id: 10,
        passengerId: 23,
        bookingDate: "2022-11-26T21:00:00",
        bookingStatus: "PAID",
        flightSeatId: 348,
        flightId: 351   
    },
    {
        id: 11,
        passengerId: 24,
        bookingDate: "2022-11-26T21:00:00",
        bookingStatus: "PAID",
        flightSeatId: 349,
        flightId: 352
    }
]

const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id"
    },
    {
        title: "Дата бронирования",
        dataIndex: "bookingDate",
        key: "bookingDate"
    },
    {
        title: "Идентификатор пассажира",
        dataIndex: "passengerId",
        key: "passengerId"
    },
    {
        title: "Идентификатор рейса",
        dataIndex: "flightId",
    }
]

    return (
        <>
        <div className={`flex flex-col gap-4 ${styles.tableBooking}`}>
            <TableHeader title="Бронирование" btnName="Забронировать" onBtnClick={() => {console.log("Забронировать click")}}/>
            <Table dataSource={bookingMockData} columns={columns} />
        </div>
        </>
    )
}