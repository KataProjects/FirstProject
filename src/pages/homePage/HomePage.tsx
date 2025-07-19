import { TicketCard } from '../../entities/Ticket';
import { mockTicket } from '../../entities/Ticket';

export const HomePage = () => {
  return (
      <div className="mt-[17px] ml-[39px] mr[45px] w-[1356px] h-[195px]">
        <TicketCard ticket={mockTicket} />
      </div>
  );
};