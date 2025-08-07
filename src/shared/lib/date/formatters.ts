import moment from 'moment';

export const formatDateTime = (dateTime: string): string => {
  return moment(dateTime).format('YYYY-MM-DD, HH:mm');
};