
import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repositories";
import { SendNotification } from "./send-notification";

describe('Send Notification', () => {
  it('Deve ser possivel enviar uma notificação', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const sendNotifications = new SendNotification(notificationsRepository)
    
    const { notification } = await sendNotifications.execute({
      content: 'Você recebeu uma nova notificação.', 
      category: 'social',
      recipientId: 'testeNoSendNotification',
    })

    // Espero que tenha pelo menos 1 notificação
    expect(notificationsRepository.notifications).toHaveLength(1);
    // Espero que a notificação seja igual a notificação q eu mandei
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  })  
})


