import { Content } from "./content"
import { Notification } from "./notification";

describe('Notification', () => {
  it('Deve ser possivel criar a notificação', () => {
    const notification = new Notification({
      content: new Content('Você recebeu uma nova notificação.'), 
      category: 'social',
      recipientId: 'example-recipient-id',
    })

    expect(notification).toBeTruthy();
  })  
})


