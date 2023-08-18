import { ApiProperty } from '@nestjs/swagger';
import { Reading } from '../entities/device.entity';
import { IsUUID, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class StoreReadingsDto {
  @ApiProperty({
    type: String,
    description: 'a string representing the UUID for the device',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    type: Array,
    description: 'The list of readings for the device',
  })
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => Reading)
  readings: Array<Reading>;
}
