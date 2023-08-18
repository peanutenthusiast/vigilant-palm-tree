import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNumber, Min } from 'class-validator';

export class Reading {
  @ApiProperty({
    type: String,
    description: 'an ISO-8061 timestamp for when the reading was taken',
  })
  @IsISO8601()
  timestamp: string;

  @ApiProperty({
    type: Number,
    description: 'An integer representing the reading data',
  })
  @IsNumber()
  @Min(0)
  count: number;
}
