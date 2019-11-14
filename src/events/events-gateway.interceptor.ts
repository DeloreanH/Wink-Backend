import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket} from 'socket.io';
import { AuthService } from '../auth/services/auth.service';
import { IPayload } from '../common/interfaces/interfaces';

@Injectable()
export class EventsGatewayInterceptor implements NestInterceptor {
 constructor( private authServ: AuthService) {}
 async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const socket: Socket = context.switchToWs().getClient();
    const token = socket.handshake.query.authorization;
    if (!token) {
      throw new WsException('Auth Token is missing');
    } else {
      try {
        const payload = await this.authServ.decode(token) as IPayload;
        context.switchToWs().getData().user_id = payload.sub._id;
      } catch (error) {
        throw new WsException(error);
      }
    }
    return next.handle();
  }
}
