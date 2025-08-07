import type { ITicket } from '@entities/Ticket';
import { TicketHeader } from '@entities/Ticket';
import { RouteInfo } from '@entities/Ticket';
import { TariffsSection } from '@entities/Ticket';

export interface TicketCardProps {
  ticket: ITicket;
}

export const TicketCard = ({ ticket }: TicketCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] border border-gray-200 w-[1356px]  ml-0">
      <div className="flex">
        <div className="flex-1 py-[25px] px-[37px] ">
          <TicketHeader airline={ticket.airline} isDirect={ticket.isDirect} />
          <RouteInfo
            departure={ticket.departure}
            arrival={ticket.arrival}
            duration={ticket.duration}
          />
        </div>
        <div className="w-[855px] flex-shrink-0 py-[15px]">
          <TariffsSection
            tariffs={ticket.tariffs}
            seatsLeft={ticket.seatsLeft}
          />
        </div>
      </div>
    </div>
  );
};