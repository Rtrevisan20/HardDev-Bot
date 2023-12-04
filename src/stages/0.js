import { storage } from '../storage.js'
import { Bot } from '../bot.js'
import { STAGES } from './index.js'

export const estagioInicial = {
  async exec({ from }) {
    storage[from].stage = STAGES.MENU
    const instanceBot = await Bot.getInstance()

    const message = `
      👋 Olá, como vai?
      Eu sou Renato, o *assistente virtual* da ${instanceBot.getSessionName}.
      *Posso te ajudar?* 🙋‍♂️
      -----------------------------------
      1️⃣ - FAZER PEDIDO
      2️⃣ - VERIFICAR TAXA DE ENTREGA
      0️⃣ - FALAR COM ATENDENTE
    `
    await instanceBot.sendText({ to: from, message })
  }
} 