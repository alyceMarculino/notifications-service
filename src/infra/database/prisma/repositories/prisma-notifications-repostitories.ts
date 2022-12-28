import { Injectable } from "@nestjs/common";
import { Notification } from "src/application/entities/notification";
import { NotificationsRepository } from "src/application/repositories/notifications-repository";
import { PrismaNotitifcationMapper } from "../mappers/prisma-notifications-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaNotificationRepository implements NotificationsRepository{
  constructor(private prisma: PrismaService){}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
      }
    })

    if (!notification){
      return null;
    }

    return PrismaNotitifcationMapper.toDomain(notification)
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        id: recipientId,
      }
    })

    return notifications.map(PrismaNotitifcationMapper.toDomain);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        id: recipientId,
      }
    })

    return count;
  }
  
  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotitifcationMapper.toPrisma(notification);
    
    await this.prisma.notification.create({
      data: raw
    })
    
    throw new Error("Method not implemented.");
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotitifcationMapper.toPrisma(notification);

    await this.prisma.notification.update({
      where: {
        id: raw.id,
      }, 
      data: raw,
    })
  }

}