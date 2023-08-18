import { IsDateString, IsNumber } from 'class-validator';

export class Device {
  id: string;
  readings: Array<Reading>;
}

export class Reading {
  @IsDateString()
  timestamp: string;

  @IsNumber()
  count: number;
}
