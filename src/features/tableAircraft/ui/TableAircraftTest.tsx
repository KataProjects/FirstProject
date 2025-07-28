import { useGetAircraftListQuery } from "../models/aircraftApi";
import { useEffect } from "react";

export const TableAircraftTest = () => {
  const {data: aircraftList, isSuccess} = useGetAircraftListQuery(null)

  useEffect(() => {
    if(isSuccess) {
      console.log(aircraftList.content);
    }
  }, [aircraftList])

  return (
    <div>Рез-тат в консоли</div>
  )
}