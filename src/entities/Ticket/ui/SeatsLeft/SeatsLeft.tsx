import { WarningCircleIcon } from '@shared/ui/icons';

export interface SeatsLeftProps {
  seatsLeft: number;
}

export const SeatsLeft = ({ seatsLeft }: SeatsLeftProps) => {
  const getSeatsText = (count: number) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
      return 'место';
    }
    if (lastDigit >= 2 && lastDigit <= 4 && !(lastTwoDigits >= 12 && lastTwoDigits <= 14)) {
      return 'места';
    }
    return 'мест';
  };

  return (
    <div className="text-sm font-medium text-[#808080] flex items-center gap-1 mt-[22px]">
      <WarningCircleIcon />
      Осталось {seatsLeft} {getSeatsText(seatsLeft)}
    </div>
  );
};