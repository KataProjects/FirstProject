import { useState } from 'react';
import {
  BackpackIcon,
  SuitcaseIcon,
  ArrowsClockwiseIcon,
  ArmchairIcon
} from '@shared/ui/icons';
import { TariffCard } from '@entities/Ticket/ui/TariffCard';
import type { ITicket } from '@entities/Ticket';

export type TariffsSectionProps = Pick<ITicket, 'tariffs' | 'seatsLeft'>;

export const TariffsSection = ({ tariffs, seatsLeft }: TariffsSectionProps) => {
  const [selectedTariff, setSelectedTariff] = useState<string | null>(null);

  const servicesAvailability = {
    basic: {
      backpack: true,
      suitcase: false,
      arrows: false,
      armchair: false
    },
    standard: {
      backpack: true,
      suitcase: true,
      arrows: false,
      armchair: false
    },
    plus: {
      backpack: true,
      suitcase: true,
      arrows: true,
      armchair: true
    }
  };

  const getColorClass = (
    tariffType: keyof typeof servicesAvailability,
    icon: keyof typeof servicesAvailability.basic
  ) => {
    return servicesAvailability[tariffType][icon]
      ? 'text-[#227420]'
      : 'text-[#808080]';
  };

  const tariffConfigs = [
    {
      type: 'basic' as const,
      title: 'Эконом Базовый',
      price: tariffs.economy.basic,
      bgColor: 'bg-[#EBF3FF]',
      icons: (
        <>
          <BackpackIcon className={`w-5 h-4.5 mr-[3px] ml-[10px] ${getColorClass('basic', 'backpack')}`} />
          <SuitcaseIcon className={`mr-[3px] ${getColorClass('basic', 'suitcase')}`} />
          <ArrowsClockwiseIcon className={`mr-[3px] ${getColorClass('basic', 'arrows')}`} />
          <ArmchairIcon className={`${getColorClass('basic', 'armchair')}`} />
        </>
      ),
      showSeatsLeft: true
    },
    {
      type: 'standard' as const,
      title: 'Эконом Стандарт',
      price: tariffs.economy.standard,
      bgColor: 'bg-[#EBF3FF]',
      icons: (
        <>
          <BackpackIcon className={`w-4.5 h-4.5 mr-[2px] ml-[10px] ${getColorClass('standard', 'backpack')}`} />
          <SuitcaseIcon className={`mr-[4px] ${getColorClass('standard', 'suitcase')}`} />
          <ArrowsClockwiseIcon className={`mr-[2px] ${getColorClass('standard', 'arrows')}`} />
          <ArmchairIcon className={`${getColorClass('standard', 'armchair')}`} />
        </>
      )
    },
    {
      type: 'plus' as const,
      title: 'Эконом Плюс',
      price: tariffs.economy.plus,
      bgColor: 'bg-[#C2DCFF]',
      icons: (
        <>
          <BackpackIcon className={`w-5 h-4.5 mr-[3px] ${getColorClass('plus', 'backpack')}`} />
          <SuitcaseIcon className={`mr-[4.88px] ${getColorClass('plus', 'suitcase')}`} />
          <ArrowsClockwiseIcon className={`mr-[3px] ${getColorClass('plus', 'arrows')}`} />
          <ArmchairIcon className={`${getColorClass('plus', 'armchair')}`} />
        </>
      ),
      dimensions: 'w-[260px] h-[165px]'
    }
  ];

  return (
    <div className="flex gap-4 w-full">
      {tariffConfigs.map((config) => (
        <TariffCard
          key={config.type}
          title={config.title}
          price={config.price}
          isSelected={selectedTariff === config.type}
          onClick={() => setSelectedTariff(config.type)}
          icons={config.icons}
          showSeatsLeft={config.showSeatsLeft}
          seatsLeft={seatsLeft}
          bgColor={config.bgColor}
          dimensions={config.dimensions}
        />
      ))}
    </div>
  );
};
