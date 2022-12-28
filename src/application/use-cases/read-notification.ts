import { Injectable } from "@nestjs/common/decorators";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFound } from "./errors/notifications-not-found";

interface ReadNotificationsRequest{
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {

constructor(private notificationsRepository: NotificationsRepository){}

  async execute(request: ReadNotificationsRequest): Promise<ReadNotificationResponse>{
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(notificationId);

    if(!notification){
      throw new NotificationNotFound()
    }

    notification.read()

    await this.notificationsRepository.save(notification)

  }
}