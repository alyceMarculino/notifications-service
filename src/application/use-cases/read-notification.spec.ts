
import { makeNotification } from "@test/factories/notification-factorie";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repositories";
import { NotificationNotFound } from "./errors/notifications-not-found";
import { ReadNotification } from "./read-notification";

describe('Read Notification', () => {
  it('Deve ser possivel enviar uma notificação', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const readNotification = new ReadNotification(notificationsRepository)
    
    const notification = makeNotification()

    await notificationsRepository.create(notification);

    await readNotification.execute({notificationId: notification.id})

    expect(notificationsRepository.notifications[0].readAt).toEqual(expect.any(Date));
  })  

  it('Teste de notificação com ID fake, não existente', () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const readNotification = new ReadNotification(notificationsRepository)

    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-id',
      })
    }).rejects.toThrow(NotificationNotFound)
  })
})
