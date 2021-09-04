import {
  IsString,
} from "class-validator";

export class LoginDto {
  @IsString()
  appId: string;
  @IsString()
  code: string;
  @IsString()
  username: string;
}