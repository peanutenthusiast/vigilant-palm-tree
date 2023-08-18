import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FetchReadingsDto {

  @ApiProperty({
    type: String,
    description: 'The UUID of the device',
  })
  @IsUUID()
  id: string;
}
