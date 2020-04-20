export const DEFAULT_PER_PAGE = 'per_page=12';
export const DEFAULT_ZIPCODE = 10001;
export const EVENTS_IN_2020 = 'timeslot_start=gte_1577836800';
export const CURRENT_EVENTS = 'timeslot_start=gte_now';
export const DATE_FILTER = {
  JAN_2020: 'timeslot_start=gte_1577836800&timeslot_start=lt_1580428800',
  FEB_2020: 'timeslot_start=gte_1580515200&timeslot_start=lt_1582934400',
  MAR_2020: 'timeslot_start=gte_1583020800&timeslot_start=lt_1585612800',
  APRIL_2020: 'timeslot_start=gte_1585699200& timeslot_start=lt_1588204800',
  MAY_2020: 'timeslot_start=gte_1588291200& timeslot_start=lt_1590883200',
};

export const MOBILZE_BASE_URL = `https://api.mobilize.us/v1/events?${DEFAULT_PER_PAGE}&${EVENTS_IN_2020}`;
