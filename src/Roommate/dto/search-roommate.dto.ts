import {
  IsString,
  MaxLength,
} from "class-validator";

export class SearchRoommateDto {
  @IsString()
  @MaxLength(60)
  title: string;
}