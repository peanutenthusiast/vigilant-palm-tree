import { Reading } from '../entities/device.entity';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class StoreReadingsDto {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  readings: Array<Reading>;
}
