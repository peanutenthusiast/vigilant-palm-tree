export class Device {
    id: string
    readings: Array<Reading>
}

export class Reading {
    timestamp: string
    count: number
}
