import { Module, Global } from '@nestjs/common';
import { EventsGateway } from '@app/events/gateway';

@Global()
@Module({
      exports: [EventsGateway],
      providers: [EventsGateway],
})
export class EventsModule {}
