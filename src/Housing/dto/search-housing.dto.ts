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

export class SearchHousingDto {
  @IsOptional()
  @IsString()
  @MaxLength(60)
  address: string;
  @IsOptional()
  @IsString()
  @MaxLength(60)
  name: string;
  @IsOptional()
  @Min(minRooms)
  @Max(maxRooms)
  size: number;
  @IsOptional()
  @IsNumber()
  startTime: number;
  @IsOptional()
  @IsNumber()
  endTime: number;
  @IsOptional()
  @IsString()
  price: string;
  @ValidateNested()
  utilities: Utilities;
  @ValidateNested()
  other: Other;
}