import { Injectable, OnModuleInit, Inject, Optional } from '@nestjs/common';
import * as admin from 'firebase-admin';

export interface NotificationsConfig {
  databaseURL: string;
}

export type AppNotificationMessage = Partial<admin.messaging.Message>;

@Injectable()
export class NotificationsService implements OnModuleInit {
  constructor(
    @Optional()
    @Inject('NotificationsConfig')
    private notificationConfig?: NotificationsConfig,
  ) {}

  public initializeNotificationService() {
    const databaseURL =
      (this.notificationConfig && this.notificationConfig.databaseURL) ||
      process.env.FIREBASE_DATABASE_NAME;
    console.log(databaseURL);
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL,
    });
  }

  onModuleInit() {
    this.initializeNotificationService();
  }

  /**
   * Envía un mensaje a un dispositivo
   *
   */
  public async sendMessage(message: admin.messaging.Message) {
    return await admin.messaging().send(message);
  }

  /**
   * Enviá un mensaje a varios dispositivos registrados
   */
  public async sendMulticast(message: admin.messaging.MulticastMessage) {
    return await admin.messaging().sendMulticast({
      ...message,
      android: {
        notification: {
          ...message.notification,
          clickAction: 'FCM_PLUGIN_ACTIVITY',
        },
      },
    });
  }

  /**
   * Env&iacute;a notificaciones en grupos que se ajusten a la m&aacute;xima
   * cantidad de tokens simultaneos permitidos por firebase, en esta versi&oacute;n
   * 500
   *
   * deviceTokens - Tokens de dispositivos registrados
   * message -
   */
  public async sendPaginatedMulticastMessage(
    deviceTokens: string[],
    message: AppNotificationMessage,
  ) {
    // M&aacute;xima cantidad de notificaciones enviadas simultaneamente
    const maxPerInteraction = +(
      process.env.FIREBASE_MAX_MULTICAST_TOKENS || 500
    );
    // Pagina el envio de notificaciones, firebase permite maximo 500 tokens simultaneos
    const nIterations = Math.ceil(deviceTokens.length / maxPerInteraction);
    const promises: Promise<any>[] = [];
    for (let i = 0; i < nIterations; i++) {
      const tokens = deviceTokens.slice(
        maxPerInteraction * i,
        maxPerInteraction * (i + 1),
      );
      const multicastMessage: admin.messaging.MulticastMessage = Object.assign(
        {
          tokens,
        },
        message,
      );
      promises.push(this.sendMulticast(multicastMessage));
    }
    return Promise.all(promises);
  }
}
