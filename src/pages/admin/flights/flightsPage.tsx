import { FlightsTable } from '@widgets/flightsTable/ui/flightTable.tsx';
import { Button } from '@shared/ui/button/button.tsx';

export const FlightsPage = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Рейсы</h1>
        <Button onClick={() => alert('Добавить рейс')}>
          Добавить рейс
        </Button>
      </div>
      <FlightsTable />
    </div>
  );
};