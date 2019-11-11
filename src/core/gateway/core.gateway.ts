import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger, UseGuards } from '@nestjs/common';
import { Socket } from 'socket.io';
import { CoreGatewayGuard } from './core-gateway.guard';


@WebSocketGateway( +process.env.GATEWAY_PORT || 3005, { transports: ['websocket'] })
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

  @UseGuards(CoreGatewayGuard)
  @SubscribeMessage('add-message')
  setNickname(client: Socket, message: string) {
    console.log('recibe esto', message, client.id);
  }

}
