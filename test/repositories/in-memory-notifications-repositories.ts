import { Notification } from "../../src/application/entities/notification";
import { NotificationsRepository } from "../../src/application/repositories/notifications-repository";

// Criando um repositorio falso para passar nos testes
export class InMemoryNotificationsRepository implements NotificationsRepository {

  public notifications: Notification[] = [];

  async create(notification: Notification){
    this.notifications.push(notification);
  }
}