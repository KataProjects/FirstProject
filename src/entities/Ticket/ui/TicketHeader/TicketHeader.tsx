import { CaretDownIcon, LogoIcon } from '@shared/ui/icons';

export interface TicketHeaderProps {
  airline: string;
  isDirect: boolean;
}

export const TicketHeader = ({ airline, isDirect }: TicketHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-[11px]">
      <div className="flex items-center">
        <div className="mr-3">
          <LogoIcon size={40} />
        </div>
        <span className="font-medium text-[#808080]">{airline}</span>
      </div>
      {isDirect && (
        <div className="flex items-center gap-1 font-medium text-base leading-5 tracking-normal text-center text-[#4797FF] font-roboto">
          Прямой рейс
          <CaretDownIcon className="text-[#4797FF]" />
        </div>
      )}
    </div>
  );
};