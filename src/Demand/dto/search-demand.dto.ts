import {
  IsString,
  MaxLength,
} from "class-validator";

export class SearchDemandDto {
  @IsString()
  @MaxLength(60)
  title: string;
}