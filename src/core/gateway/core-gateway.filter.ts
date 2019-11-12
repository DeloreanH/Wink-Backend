import { ArgumentsHost, Catch, WsExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Catch()
export class CoreGatewayFilter implements WsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    const socket = host.switchToWs().getClient();
    socket.emit('exception', exception);
  }
}
