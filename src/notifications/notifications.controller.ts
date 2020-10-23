import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { DevicesTokensService } from './devices-tokens/devices-tokens.service';
import { UserDeviceDTO } from './dto/user-devices.dto';

@Controller('notifications')
export class NotificationsController {

  private logger: Logger = new Logger('NotificationsController');

  constructor(private devicesTokensService: DevicesTokensService) {}

  @Post('device-token')
  public async saveDeviceToken(@Body() loginUserDto: UserDeviceDTO) {
    try {
      return await this.devicesTokensService.updateDeviceToken(loginUserDto.userId, loginUserDto.token);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
