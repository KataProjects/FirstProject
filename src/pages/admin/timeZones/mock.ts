export interface Timezone {
  id: number;
  country: string;
  city: string;
  utc: string;
}

export const mockTimezones: Timezone[] = [
  { id: 1, country: 'Россия', city: 'Москва', utc: 'GMT +3' },
  { id: 2, country: 'США', city: 'Нью-Йорк', utc: 'GMT -5' },
  { id: 3, country: 'Япония', city: 'Токио', utc: 'GMT +9' },
  { id: 4, country: 'Австралия', city: 'Сидней', utc: 'GMT +10' },
  { id: 5, country: 'Франция', city: 'Париж', utc: 'GMT +1' },
  { id: 6, country: 'Германия', city: 'Берлин', utc: 'GMT +1' },
  { id: 7, country: 'Бразилия', city: 'Сан-Паулу', utc: 'GMT -3' },
  { id: 8, country: 'Индия', city: 'Дели', utc: 'GMT +5:30' },
  { id: 9, country: 'Китай', city: 'Пекин', utc: 'GMT +8' },
  { id: 10, country: 'Великобритания', city: 'Лондон', utc: 'GMT +0' },
  { id: 11, country: 'Южная Корея', city: 'Сеул', utc: 'GMT +9' },
  { id: 12, country: 'Египет', city: 'Каир', utc: 'GMT +2' },
];
