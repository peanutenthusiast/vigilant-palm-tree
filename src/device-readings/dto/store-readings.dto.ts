import { ApiProperty } from '@nestjs/swagger';
import { Reading } from '../entities/device.entity';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class StoreReadingsDto {

  @ApiProperty({
    type: String,
    description: 'a string representing the UUID for the device'
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    type: Array,
    description: 'The list of readings for the device'
  })
  @IsNotEmpty()
  readings: Array<Reading>;
}
