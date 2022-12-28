
import { makeNotification } from "@test/factories/notification-factorie";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repositories";
import { GetRecipientNotification } from "./get-recipient-notifications";

describe('Contador de Notification', () => {
  it('Teste de contagem de notificação', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const getRecipientNotifications = new GetRecipientNotification(notificationsRepository)

    await notificationsRepository.create( makeNotification({recipientId: '1'}));
    await notificationsRepository.create( makeNotification({recipientId: '1'}));
    await notificationsRepository.create( makeNotification({recipientId: '2'}));

    const {notifications} = await getRecipientNotifications.execute({
      recipientId: '1',
    })

    expect(notifications).toHaveLength(3)
    expect(notifications).toEqual(expect.arrayContaining([
      expect.objectContaining({recipientId: '1'}),
      expect.objectContaining({recipientId: '1'}),
      expect.objectContaining({recipientId: '2'}),
    ]))
  })
})
