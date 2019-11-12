import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, WsException } from '@nestjs/websockets';
import { OnModuleInit } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { AuthService } from 'src/shared/services/auth.service';
import { IPayload } from 'src/common/interfaces/interfaces';

@WebSocketGateway( +process.env.GATEWAY_PORT || 3005, { transports: ['websocket'] })
export class CoreGateway implements OnModuleInit {
  public clients = new Map();
  @WebSocketServer()
  public wss: Server;

  constructor( private authServ: AuthService) {}

  onModuleInit() {
    this.authMw();
    this.onConnect();
    this.onDisconnect();

  }

  private authMw() {
    this.wss.use(async (socket: Socket, next) => {
      const token = socket.handshake.query.auth;
      if (!token) {
        return next(new Error('Auth Token not found'));
      } else {
        try {
          const payload = await this.authServ.decode(token) as IPayload;
          socket.handshake.query.user_id = payload.sub._id;
          return next();
        } catch (error) {
          return next(new Error(error));
        }
      }
    });
  }
  private onConnect() {
    this.wss.on('connection', (socket: Socket) => {
      this.clients.set(socket.handshake.query.user_id, socket.client.id);
      console.log('connect', socket.handshake.query.user_id);
      console.log('clientes on connect', this.clients);
    });
  }
  private onDisconnect() {
    this.wss.on('disconnect', (socket: Socket) => {
      this.clients.delete(socket.handshake.query.user_id);
      console.log('disconnect', socket.handshake.query.user_id);
      console.log('clientes on disconnect', this.clients);
    });
  }

}
