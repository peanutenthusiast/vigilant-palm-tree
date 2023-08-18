import { IsUUID } from 'class-validator';

export class FetchReadingsDto {
  @IsUUID()
  id: string;
}
