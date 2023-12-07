import { storage } from '../storage.js'
import { Bot } from '../bot.js'
import { STAGES } from './index.js'

export const WelcomeMessage = {
  async exec({ from }) {
    storage[from].stage = STAGES.MENU
    const instanceBot = await Bot.getInstance()

    const message =
      `
👋 Olá, como vai?
Eu sou Eliezer, o *assistente virtual* da ${instanceBot.getSessionName}.
*Em que Posso te ajudar?* 🙋‍♂️
-----------------------------------
1️⃣ - Valor das Canecas
2️⃣ - Taxa de Entrega
3️⃣ - Fazer Pedido
`
    await instanceBot.sendText({ to: from, message })
  },
}