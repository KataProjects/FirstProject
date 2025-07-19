import { useState } from 'react';
import { BackpackIcon, SuitcaseIcon, ArrowsClockwiseIcon, ArmchairIcon } from '@shared/ui/icons';
import { SeatsLeft } from './SeatsLeft';

interface TariffsSectionProps {
  tariffs: {
    economy: {
      basic: number;
      standard: number;
      plus: number;
    };
  };
  seatsLeft: number;
}

export const TariffsSection = ({ tariffs, seatsLeft }: TariffsSectionProps) => {
  const [selectedTariff, setSelectedTariff] = useState<string | null>(null);

  return (
    <div className="flex gap-4 w-full">
      <div
        className={`flex flex-col bg-[#EBF3FF] rounded-lg pt-[20px] p-4 relative transition-shadow cursor-pointer
          ${selectedTariff === 'basic' ? 'shadow-[0_4px_4px_rgba(0,0,0,0.25)]' : ''}`}
        onClick={() => setSelectedTariff('basic')}
      >
        <div className="flex justify-between items-center mb-[17px]">
          <span className="font-medium text-[16px] leading-[20px] tracking-normal text-[#2E2E2E] font-roboto">
            Эконом Базовый
          </span>
          <BackpackIcon className="w-5 h-4.5 text-gray-400 mr-[3px] ml-[10px]" />
          <SuitcaseIcon className="text-[#808080] mr-[3px]" />
          <ArrowsClockwiseIcon className="text-[#808080] mr-[3px]" />
          <ArmchairIcon className="text-[#808080] " />
        </div>
        <span className="font-semibold text-[28px] leading-[32px] tracking-normal font-roboto">
          {tariffs.economy.basic.toLocaleString('ru-RU')} ₽
        </span>
        <div className="absolute bottom-4 left-4 right-4">
          <SeatsLeft seatsLeft={seatsLeft} />
        </div>
      </div>
      <div
        className={`flex flex-col bg-[#EBF3FF] rounded-lg pt-[20px] p-4 relative transition-shadow cursor-pointer
          ${selectedTariff === 'standard' ? 'shadow-[0_4px_4px_rgba(0,0,0,0.25)]' : ''}`}
        onClick={() => setSelectedTariff('standard')}
      >
        <div className="flex justify-between items-center mb-[17px]">
          <span className="font-medium text-[16px] leading-[20px] tracking-normal text-[#2E2E2E] font-roboto">
            Эконом Стандарт
          </span>
          <div className="flex items-center">
            <BackpackIcon className="w-4.5 h-4.5 text-gray-400 mr-[2px] ml-[10px]" />
            <SuitcaseIcon className="text-[#227420] mr-[4px]" />
            <ArrowsClockwiseIcon className="text-[#808080] mr-[2px]" />
            <ArmchairIcon className="text-[#808080]" />
          </div>
        </div>
        <span className="font-semibold text-[28px] leading-[32px] tracking-normal font-roboto">
          {tariffs.economy.standard.toLocaleString('ru-RU')} ₽
        </span>
      </div>
      <div
        className={`flex flex-col bg-[#C2DCFF] rounded-lg pt-[20px] p-4 w-[260px] h-[165px] transition-shadow cursor-pointer
          ${selectedTariff === 'plus' ? 'shadow-[0_4px_4px_rgba(0,0,0,0.25)]' : ''}`}
        onClick={() => setSelectedTariff('plus')}
      >
        <div className="flex justify-between items-center mb-[17px]">
          <span className="font-medium text-[16px] leading-[20px] tracking-normal text-[#2E2E2E] font-roboto">
            Эконом Плюс
          </span>
          <div className="flex items-center">
            <BackpackIcon className="w-5 h-4.5 text-blue-500 mr-[3px]" />
            <SuitcaseIcon className="text-[#227420] mr-[4.88px]" />
            <ArrowsClockwiseIcon className="text-[#227420] mr-[3px]" />
            <ArmchairIcon className="text-[#227420]"/>
          </div>
        </div>
        <span className="font-semibold text-[28px] leading-[32px] tracking-normal font-roboto">
          {tariffs.economy.plus.toLocaleString('ru-RU')} ₽
        </span>
      </div>
    </div>
  );
};