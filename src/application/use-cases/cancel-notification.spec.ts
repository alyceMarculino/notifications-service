
import { makeNotification } from "@test/factories/notification-factorie";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repositories";
import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFound } from "./errors/notifications-not-found";

describe('Cancel Notification', () => {
  it('Deve ser possivel enviar uma notificação', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationsRepository)
    
    const  notification = makeNotification()

    await notificationsRepository.create(notification);

    await cancelNotification.execute({notificationId: notification.id})

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
  })  

  it('Teste de notificação com ID fake, não existente', () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationsRepository)

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-id',
      })
    }).rejects.toThrow(NotificationNotFound)
  })
})
