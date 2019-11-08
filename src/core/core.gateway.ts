import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';

@WebSocketGateway(3005, { transports: ['websocket'] })
export class CoreGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  wss;

  private logger = new Logger ('AppGateway');

  handleConnection(client) {
    this.logger.log('New client connected', client.id);
    client.emit('bla', 'Harry');
  }

  handleDisconnect(client) {
    this.logger.log('Client disconnected', client.id);
    client.emit('disconect', 'Successfully connected to server');
  }

  @SubscribeMessage('add-message')
  setNickname(client: Socket, message: string) {
    console.log('recibe esto', message, client.id);
  }

}
