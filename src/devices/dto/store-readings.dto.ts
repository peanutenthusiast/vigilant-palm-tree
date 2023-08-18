import { Reading } from "../entities/device.entity"

export class StoreReadingsDto {
    id: string
    readings: Array<Reading>
}