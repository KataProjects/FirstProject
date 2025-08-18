export const FLIGHT_STATUS_MAP = {
  'ON_TIME': 'В срок',
  'DELAYED': 'Отложен',
  'COMPLETED': 'Завершенный',
  'CANCELED': 'Отменен',
  'ARRIVED': 'Прибыл',
  'DEPARTED': 'Отправлен'
} as const;

export type FlightStatusKey = keyof typeof FLIGHT_STATUS_MAP;