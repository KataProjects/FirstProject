import { WarningCircleIcon } from '@shared/ui/icons';

interface SeatsLeftProps {
  seatsLeft: number;
}

export const SeatsLeft = ({ seatsLeft }: SeatsLeftProps) => (
    <div className="text-sm font-medium text-[#808080] flex items-center gap-1 mt-[22px]">
      <WarningCircleIcon />
      Осталось {seatsLeft} места
    </div>
);
