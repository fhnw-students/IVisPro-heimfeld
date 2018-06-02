import moment from 'moment';

export const dateTransformer = (value: string) =>
  moment(new Date(`${value.substring(0, 4)}-${value.substring(4, 6)}-${value.substring(6, 8)}`));
