import { IsString } from 'class-validator';

export class UserDeviceDTO {
  @IsString()
  readonly userdId: string;

  @IsString()
  readonly token: string;
}
