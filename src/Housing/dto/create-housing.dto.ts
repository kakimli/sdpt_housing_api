import { 
  IsNumber,
  IsOptional,
  IsString, 
  Max, 
  MaxLength, 
  Min, 
  ValidateNested
} from "class-validator";

const minRooms = 0;
const maxRooms = 7;

class Utilities {
  @IsOptional()
  @IsNumber()
  water?: number;
  @IsOptional()
  @IsNumber()
  power?: number;
  @IsOptional()
  @IsNumber()
  net?: number;
  @IsOptional()
  @IsNumber()
  cooking?: number;
  @IsOptional()
  @IsNumber()
  laundry?: number;
}

class Other {
  @IsOptional()
  @IsNumber()
  female?: number;
  @IsOptional()
  @IsNumber()
  pet?: number;
}

export class CreateHousingDto {
  @IsString()
  @MaxLength(60)
  address: string;
  @IsString()
  @MaxLength(60)
  name: string;
  @Min(minRooms)
  @Max(maxRooms)
  size: number;
  @IsNumber()
  startTime: number; // new Date('2021-09-01') .getTime()
  @IsNumber()
  endTime: number;
  @IsString()
  price: string;
  @ValidateNested()
  utilities: Utilities;
  @ValidateNested()
  other: Other;
  @IsString()
  @MaxLength(400)
  desc: string;
  @IsString()
  @MaxLength(60)
  contactName: string;
  @IsString()
  @MaxLength(60)
  contact: string;
  @IsOptional()
  @IsString()
  @MaxLength(100)
  message?: string;
  @IsString({
    each: true
  })
  images: string[];
}