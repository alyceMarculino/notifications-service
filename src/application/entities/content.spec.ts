import { Content } from "./content"

describe('Notification content', () => {
  test('Deve ser possivel criar o conteudo da notificação', () => {
    const content = new Content('Você recebeu uma nova notificação.')
    
    expect(content).toBeTruthy();
  })
    
  test('Não Deve ser possivel criar o conteudo da notificação com menos de 5 caracteres', () => {
    expect(() => new Content('Oi.')).toThrow();
  })
    
  test('Não Deve ser possivel criar o conteudo da notificação com mais de 240 caracteres', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  })
})


