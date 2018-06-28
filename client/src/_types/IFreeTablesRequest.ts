export interface IFreeTablesRequest {
  day: string;
  hoursFrom: number;
  hoursTo: number;
  seats: number;
  wholeDay: boolean;
}
