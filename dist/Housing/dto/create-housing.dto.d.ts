declare class Utilities {
    water?: number;
    power?: number;
    net?: number;
    cooking?: number;
    laundry?: number;
}
declare class Other {
    female?: number;
    pet?: number;
}
export declare class CreateHousingDto {
    address: string;
    name: string;
    size: number;
    startTime: number;
    endTime: number;
    price: string;
    utilities: Utilities;
    other: Other;
    desc: string;
    contactName: string;
    contact: string;
    message?: string;
    images: string[];
}
export {};
