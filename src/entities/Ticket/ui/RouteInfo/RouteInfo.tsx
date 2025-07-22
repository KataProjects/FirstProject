import { AirplaneLandingIcon, AirplaneTakeoffIcon, LineIcon } from '@shared/ui/icons';
import type { ITicket } from '@entities/Ticket';

export interface RouteInfoProps {
  departure: ITicket['departure'];
  arrival: ITicket['arrival'];
  duration: ITicket['duration'];
}

export const RouteInfo = ({ departure, arrival, duration }: RouteInfoProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center text-sm text-gray-500">
        <AirplaneTakeoffIcon className="w-4 h-4 mr-2" />
        <span className="font-roboto font-medium text-base leading-5 text-[#808080]">
          в пути {duration}
        </span>
        <AirplaneLandingIcon className="w-4 h-4 ml-2" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-roboto font-semibold text-[28px] leading-[32px] text-[#2E2E2E] text-right">
            {departure.time}
          </span>
          <span className="text-base font-medium text-[#2E2E2E] ml-4">{departure.airport}</span>
        </div>
        <LineIcon className="flex-1 mx-4 text-gray-300" />
        <div className="flex items-center">
          <span className="text-medium font-medium text-[#2E2E2E] mr-4">{arrival.airport}</span>
          <span className="font-roboto font-semibold text-[28px] leading-[32px] text-[#2E2E2E] text-right">
            {arrival.time}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-[4px]">
        <div className="flex flex-col">
          <span className="font-roboto font-medium text-base leading-5 text-[#808080]">
            {departure.city}
          </span>
          <span className="font-roboto font-medium text-base leading-5 text-[#808080]">
            {departure.date}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-roboto font-medium text-base leading-5 text-[#808080] text-right">
            {arrival.city}
          </span>
          <span className="font-roboto font-medium text-base leading-5 text-[#808080] text-right">
            {arrival.date}
          </span>
        </div>
      </div>
    </div>
  );
};