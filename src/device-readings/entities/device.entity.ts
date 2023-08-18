import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber } from 'class-validator';

export class Device {
  id: string;
  readings: Array<Reading>;
}

export class Reading {

  @ApiProperty({
    type: String,
    description: 'an ISO-8061 timestamp for when the reading was taken'
  })
  @IsDateString()
  timestamp: string;

  @ApiProperty({
    type: Number,
    description: 'An integer representing the reading data'
  })
  @IsNumber()
  count: number;
}
