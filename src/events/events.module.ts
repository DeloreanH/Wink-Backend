import { Module, Global } from '@nestjs/common';
import { EventsGateway } from './events.gateway';

@Global()
@Module({
      exports: [EventsGateway],
      providers: [EventsGateway],
})
export class EventsModule {}
