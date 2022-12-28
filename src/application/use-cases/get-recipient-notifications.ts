import { Injectable } from "@nestjs/common/decorators";
import { Notification } from "../entities/notification";
import { NotificationsRepository } from "../repositories/notifications-repository";

interface GetRecipinetNotificationRequest{
  recipientId: string;
}

interface GetRecipientNotificationResponse{
  notifications: Notification[];
};

@Injectable()
export class GetRecipientNotification {

constructor(private notificationsRepository: NotificationsRepository){}

  async execute(request: GetRecipinetNotificationRequest): Promise<GetRecipientNotificationResponse>{
    const { recipientId } = request;

    const notifications = await this.notificationsRepository.findManyByRecipientId(recipientId);

    return {
      notifications,
    };

  }
}