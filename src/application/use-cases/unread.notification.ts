import { Injectable } from "@nestjs/common/decorators";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFound } from "./errors/notifications-not-found";

interface UnreadNotificationsRequest{
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {

constructor(private notificationsRepository: NotificationsRepository){}

  async execute(request: UnreadNotificationsRequest): Promise<UnreadNotificationResponse>{
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(notificationId);

    if(!notification){
      throw new NotificationNotFound()
    }

    notification.unread()

    await this.notificationsRepository.save(notification)

  }
}