import {
  IsOptional,
  IsString,
  MaxLength
} from "class-validator";

export class CreateDemandDto {
  @IsString()
  @MaxLength(60)
  title: string;
  @IsString()
  @MaxLength(140)
  content: string;
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
}