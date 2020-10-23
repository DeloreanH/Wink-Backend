import { IsNotEmpty, IsString } from 'class-validator';

export class UserDeviceDTO {
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @IsNotEmpty()
  @IsString()
  readonly token: string;
}
