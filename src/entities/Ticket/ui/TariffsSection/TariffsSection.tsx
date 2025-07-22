import { useState } from 'react';
import { BackpackIcon, SuitcaseIcon, ArrowsClockwiseIcon, ArmchairIcon } from '@shared/ui/icons';
import { TariffCard } from '@entities/Ticket/ui/TariffCard';
import type { ITicket } from '@entities/Ticket';

export interface TariffsSectionProps {
  tariffs: ITicket['tariffs'];
  seatsLeft: number;
}

export const TariffsSection = ({ tariffs, seatsLeft }: TariffsSectionProps) => {
  const [selectedTariff, setSelectedTariff] = useState<string | null>(null);

  const tariffConfigs = [
    {
      type: 'basic',
      title: 'Эконом Базовый',
      price: tariffs.economy.basic,
      bgColor: 'bg-[#EBF3FF]',
      icons: [
        <BackpackIcon key="backpack" className="w-5 h-4.5 text-gray-400 mr-[3px] ml-[10px]" />,
        <SuitcaseIcon key="suitcase" className="text-[#808080] mr-[3px]" />,
        <ArrowsClockwiseIcon key="arrows" className="text-[#808080] mr-[3px]" />,
        <ArmchairIcon key="armchair" className="text-[#808080]" />
      ],
      showSeatsLeft: true
    },
    {
      type: 'standard',
      title: 'Эконом Стандарт',
      price: tariffs.economy.standard,
      bgColor: 'bg-[#EBF3FF]',
      icons: [
        <BackpackIcon key="backpack" className="w-4.5 h-4.5 text-gray-400 mr-[2px] ml-[10px]" />,
        <SuitcaseIcon key="suitcase" className="text-[#227420] mr-[4px]" />,
        <ArrowsClockwiseIcon key="arrows" className="text-[#808080] mr-[2px]" />,
        <ArmchairIcon key="armchair" className="text-[#808080]" />
      ]
    },
    {
      type: 'plus',
      title: 'Эконом Плюс',
      price: tariffs.economy.plus,
      bgColor: 'bg-[#C2DCFF]',
      icons: [
        <BackpackIcon key="backpack" className="w-5 h-4.5 text-blue-500 mr-[3px]" />,
        <SuitcaseIcon key="suitcase" className="text-[#227420] mr-[4.88px]" />,
        <ArrowsClockwiseIcon key="arrows" className="text-[#227420] mr-[3px]" />,
        <ArmchairIcon key="armchair" className="text-[#227420]" />
      ],
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
          icons={<>{config.icons}</>}
          showSeatsLeft={config.showSeatsLeft}
          seatsLeft={seatsLeft}
          bgColor={config.bgColor}
          dimensions={config.dimensions}
        />
      ))}
    </div>
  );
};