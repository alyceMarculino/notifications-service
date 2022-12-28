import { Body, Controller, Post, Param, Patch, Get } from '@nestjs/common';
import { CancelNotification } from 'src/application/use-cases/cancel-notification';
import { CountRecipientNotification } from 'src/application/use-cases/count-recipient-notifications';
import { GetRecipientNotification } from 'src/application/use-cases/get-recipient-notifications';
import { ReadNotification } from 'src/application/use-cases/read-notification';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { UnreadNotification } from 'src/application/use-cases/unread.notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../viewModels/notification-view-model';

@Controller('notifications')
export class NotificationsController {

  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotitification: ReadNotification,
    private unreadNotitification: UnreadNotification,
    private countRecipient: CountRecipientNotification,
    private getRecipient: GetRecipientNotification,
  ){}

  @Patch(':id/cancel')
  async cancel(@Param('id') id:string){
    await this.cancelNotification.execute({notificationId: id}) 
  }

  @Get('/count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId:string): Promise<{count: number}>{
    const { count } = await this.countRecipient.execute({
      recipientId,
    })

    return{ count, }
  }
  
  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId:string){
    const { notifications } = await this.getRecipient.execute({
      recipientId,
    })

    return { notifications: notifications.map(NotificationViewModel.toHTTP)}
  }

  @Patch(':id/read')
  async read(@Param('id') id:string){
    await this.readNotitification.execute({notificationId: id}) 
  }

  @Patch(':id/unread')
  async unread(@Param('id') id:string){
    await this.unreadNotitification.execute({notificationId: id}) 
  }
  


  @Post()
  async create (@Body() body: CreateNotificationBody) {
    const {content, recipientId, category} = body;

    const { notification } = await this.sendNotification.execute({
      content, recipientId, category
    })

    return { notification: NotificationViewModel.toHTTP(notification)}
  }
}