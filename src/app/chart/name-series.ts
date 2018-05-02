import { DateValue } from './date-value';

export interface NameSeries<T> {
  name: string;
  series: DateValue<T>[];
}
