declare module 'react-date-range' {
  import type { Component } from 'react';

  interface Range {
    startDate?: Date;
    endDate?: Date;
    color?: string;
    key?: string;
    autoFocus?: boolean;
    disabled?: boolean;
    showDateDisplay?: boolean;
  }

  export type { Range };

  export class DateRange extends Component<any> {}

  export class DateRangePicker extends Component<any> {}
}
