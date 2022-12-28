
import { makeNotification } from "@test/factories/notification-factorie";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repositories";
import { CountRecipientNotification } from "./count-recipient-notifications";

describe('Contador de Notification', () => {
  it('Teste de contagem de notificação', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const countRecipientNotifications = new CountRecipientNotification(notificationsRepository)

    await notificationsRepository.create( makeNotification({recipientId: '1'}));
    await notificationsRepository.create( makeNotification({recipientId: '1'}));
    await notificationsRepository.create( makeNotification({recipientId: '2'}));

    const {count} = await countRecipientNotifications.execute({
      recipientId: '1',
    })

    expect(count).toEqual(2)
  })
})
