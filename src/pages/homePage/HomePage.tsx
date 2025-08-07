import { TicketCard, mockTicket } from '@entities/Ticket';

export const HomePage = () => {
  return (
      <div className="mt-[17px]">
        <TicketCard ticket={mockTicket} />
      </div>
  );
};