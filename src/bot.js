import { create } from "venom-bot";

export class Bot {
  #secao
  #instanceBot

  static getInstance() {
    if (Bot.instance === undefined) Bot.instance = new Bot()
    return Bot.instance
  }

  async init({ session, headless, useChrome }) {
    this.#secao = session
    this.#instanceBot = await create({
      session,
      headless,
      useChrome,
      multidevice: false,
    })
    return this
  }

  get getSessionName() {
    return this.#secao
  }

  async onMessage(callback) {
    if (!this.#instanceBot) throw new Error('Bot não Inicializado!')
    return await this.#instanceBot.onMessage(callback)
  }

  async sendText({ to, message }) {
    if (!this.#instanceBot) throw new Error('Bot não Inicializado!')
    return await this.#instanceBot.sendText(to, message)
  }

  // Não está funcionando - Fazer testes
  async sendButtons({ to, title, buttons, description }) {
    if (!this.#instanceBot) throw new Error('Bot não Inicializado!')

    return await this.#instanceBot.sendButtons(
      to,
      title,
      buttons,
      description,
    )
  }

  async markUnseenMessage({ to }) {
    if (!this.#instanceBot) throw new Error('Bot não Inicializado!')
    return await this.#instanceBot.markUnseenMessage(to)
  }
}