import { Injectable } from "@nestjs/common/decorators";
import { receiveMessageOnPort } from "worker_threads";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFound } from "./errors/notifications-not-found";

interface CountRecipientNotificationRequest{
  recipientId: string;
}

interface CountRecipientNotificationResponse{
  count: number;
};

@Injectable()
export class CountRecipientNotification {

constructor(private notificationsRepository: NotificationsRepository){}

  async execute(request: CountRecipientNotificationRequest): Promise<CountRecipientNotificationResponse>{
    const { recipientId } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(recipientId);

    return {count};

  }
}