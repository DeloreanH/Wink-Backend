import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayInit,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { AuthService } from '@auth/services';
import { IPayload } from '@app/common/interfaces';
import { Socket, Server } from 'socket.io';

@WebSocketGateway( +process.env.GATEWAY_PORT || 3005, { transports: ['websocket'] })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  public userClients = new Map();
  @WebSocketServer() public wss: Server;

  constructor(private authServ: AuthService) {}

  // clients handlers and auth middleware
  private gatewayMiddleware(server: Server) {
    server.use(async (socket: Socket, next) => {
      const token = socket.handshake.query.auth;
      if (!token) {
        return next(new Error('Auth Token not found'));
      } else {
        try {
          const payload = await this.authServ.decode(token) as IPayload;
          socket.handshake.query.userId = payload.sub._id;
          return next();
        } catch (error) {
          return next(new Error(error));
        }
      }
    });
  }
  private addClient(client: Socket, userId: string): void {
    const data = this.userClients.get(userId);
    if (data) {
      data.push(client.id);
      this.userClients.set(userId, data);
    } else {
      this.userClients.set(userId, [client.id]);
    }
  }
  private removeClient(client: Socket, userId: string): void {
    const filtered = this.userClients.get(userId).filter(clientId => clientId !== client.id);
    if (filtered.length > 0) {
      this.userClients.set(userId, filtered);
    } else {
      this.userClients.delete(userId);
    }
  }

  // life cycles hooks
  afterInit(server: Server) {
    this.gatewayMiddleware(server);
  }
  handleConnection(client: Socket) {
    client.join('public');
    this.addClient(client, client.handshake.query.userId);
    client.emit('connection', 'Successfully connected to server');
  }
  handleDisconnect(client: Socket) {
    client.leave('public');
    this.removeClient(client, client.handshake.query.userId);
    client.emit('disconnect', 'Successfully disconnected from server');
  }

  // public room events
  @SubscribeMessage('update-user')
  handleUserStatus(client: Socket, data: any) {
    client.to('public').emit('updated-user', data);
  }
  @SubscribeMessage('avatar-upload')
  handleAvatarUpload(client: Socket, data: any) {
    client.to('public').emit('avatar-uploaded', data);
  }

  // user to user events
  @SubscribeMessage('send-wink')
  handleSendWink(client: Socket, data: any) {
    const receivers = this.userClients.get(data.winkUser.toString());
    const self = this.userClients.get(client.handshake.query.userId).filter( filtered => filtered !== client.id);
    if (receivers) {
      receivers.forEach( (clientId: string) => {
        client.to(clientId).emit('sended-wink', data);
      });
    }
    if (self) {
      self.forEach( (clientId: string) => {
        client.to(clientId).emit('sended-wink', data);
      });
    }
  }
  @SubscribeMessage('handle-wink')
  handleApproveWink(client: Socket, data: any) {
    const receivers = this.userClients.get(data.winkUser.toString());
    const self = this.userClients.get(client.handshake.query.userId).filter( filtered => filtered !== client.id);
    if (receivers) {
      receivers.forEach( (clientId: string) => {
        client.to(clientId).emit('handled-wink', data);
      });
    }
    if (self) {
      self.forEach( (clientId: string) => {
        client.to(clientId).emit('handled-wink', data);
      });
    }
  }
  @SubscribeMessage('delete-wink')
  handleDeleteWink(client: Socket, data: any) {
    const receivers = this.userClients.get(data.winkUser.toString());
    const self = this.userClients.get(client.handshake.query.userId).filter( filtered => filtered !== client.id);
    if (receivers) {
      receivers.forEach( (clientId: string) => {
        client.to(clientId).emit('deleted-wink', data);
      });
    }
    if (self) {
      self.forEach( (clientId: string) => {
        client.to(clientId).emit('deleted-wink', data);
      });
    }
  }
}
