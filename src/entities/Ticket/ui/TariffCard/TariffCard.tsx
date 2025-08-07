import type { ReactNode } from 'react';
import { getSeatText } from '@shared/utils/getSeatText.ts';
import type { ITicket } from '@entities/Ticket';
import { WarningCircleIcon } from '@shared/ui/icons';

interface TariffCardProps extends Pick<ITicket, 'seatsLeft'> {
  title: string;
  price: number;
  isSelected: boolean;
  onClick: () => void;
  icons: ReactNode;
  showSeatsLeft?: boolean;
  bgColor?: string;
  dimensions?: string;
}

export const TariffCard = ({
   title,
   price,
   isSelected,
   onClick,
   icons,
   showSeatsLeft = false,
   seatsLeft = 0,
   bgColor = 'bg-[#EBF3FF]',
   dimensions = ''
}: TariffCardProps) => {
const shadowClass = 'shadow-[0_4px_4px_rgba(0,0,0,0.25)]';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col text-left ${bgColor} rounded-lg pt-[20px] p-4 relative transition-shadow ${dimensions} ${
        isSelected ? shadowClass : ''
      }`}
    >
      <div className="flex justify-between items-center mb-[17px]">
        <span className="font-medium text-[16px] leading-[20px] tracking-normal text-[#2E2E2E] font-roboto">
          {title}
        </span>
        <div className="flex items-center">{icons}</div>
      </div>

      <span className="font-semibold text-[28px] leading-[32px] tracking-normal font-roboto">
        {new Intl.NumberFormat('ru-RU').format(price)} ₽
      </span>

      {showSeatsLeft && (
        <div className=" absolute bottom-4 left-4 right-4 text-sm font-medium text-[#808080] flex items-center gap-1 mt-[22px]">
          <WarningCircleIcon />
          {`Осталось ${seatsLeft} ${getSeatText(seatsLeft)}`}
        </div>
      )}
    </button>
  );
};
