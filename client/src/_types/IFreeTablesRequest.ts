export interface IFreeTablesRequest {
  day: Date;
  hoursFrom: number;
  hoursTo: number;
  seats: number;
  wholeDay: boolean;
}
