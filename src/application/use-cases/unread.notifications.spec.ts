
import { makeNotification } from "@test/factories/notification-factorie";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repositories";
import { NotificationNotFound } from "./errors/notifications-not-found";
import { ReadNotification } from "./read-notification";
import { UnreadNotification } from "./unread.notification";

describe('Read Notification', () => {
  it('Deve ser possivel enviar uma notificação', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const unreadNotification = new UnreadNotification(notificationsRepository)
    
    const notification = makeNotification({readAt: new Date()})

    await notificationsRepository.create(notification);

    await unreadNotification.execute({notificationId: notification.id})

    expect(notificationsRepository.notifications[0].readAt).toBeNull;
  })  

  it('Teste de notificação com ID fake, não existente', () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const unreadNotification = new UnreadNotification(notificationsRepository)

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-id',
      })
    }).rejects.toThrow(NotificationNotFound)
  })
})
