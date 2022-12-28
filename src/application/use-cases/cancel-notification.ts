import { Injectable } from "@nestjs/common/decorators";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFound } from "./errors/notifications-not-found";

interface CancelNotificationsRequest{
  notificationId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {

constructor(private notificationsRepository: NotificationsRepository){}

  async execute(request: CancelNotificationsRequest): Promise<CancelNotificationResponse>{
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(notificationId);

    if(!notification){
      throw new NotificationNotFound()
    }

    notification.cancel()

    await this.notificationsRepository.save(notification)

  }
}