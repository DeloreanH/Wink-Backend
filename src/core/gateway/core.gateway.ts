import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthService } from '../../shared/services/auth.service';
import { IPayload, IUserClients } from '../../common/interfaces/interfaces';

@WebSocketGateway( +process.env.GATEWAY_PORT || 3005, { transports: ['websocket'] })
export class CoreGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  public userClients: IUserClients[] = [];
  @WebSocketServer() public wss: Server;

  constructor(private authServ: AuthService) {}

  afterInit(server: Server) {
    this.gatewayMiddleware(server);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.addClient(client, client.handshake.query.userId);
  }
  handleDisconnect(client: Socket) {
    this.removeClient(client, client.handshake.query.userId);
  }

  @SubscribeMessage('add-message')
  handleEvent(client: Socket, data: string) {
    console.log('evento dentro del auth', client.id, data);
  }
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
      const index = this.userClients.findIndex(data => data.user_id === userId);
      if (index === -1) {
        this.userClients.push({user_id: userId, clients: [client.id]});
      } else {
        this.userClients[index].clients.push(client.id);
      }
  }
  private removeClient(client: Socket, userId: string): void {
    const index = this.userClients.findIndex(data => data.user_id === userId);
    if (index !== -1) {
      this.userClients[index].clients = this.userClients[index].clients.filter(clientId => clientId !== client.id);
      if (this.userClients[index].clients.length === 0) {
        this.userClients.splice(index, 1);
      }
    }
  }
}
