import { storage } from '../storage.js'
import { Bot } from '../bot.js'
import { STAGES } from './index.js'

export const estagioInicial = {
  async exec(params) {

    const body = params.message.trim()
    const isMsgValid = /[1|2]/.test(body)

    if (isMsgValid) {
      const option = options[Number(message)]()
      msg = option.message
      storage[params.from].stage = option.nextStage || STAGES.INICIAL
    }
    const instanceBot = await Bot.getInstance()

    storage[params.from].stage = STAGES.INICIAL


    const message =
      `
👋 Olá, como vai?
Eu sou Eliezer, o *assistente virtual* da ${instanceBot.getSessionName}.
*Posso te ajudar?* 🙋‍♂️
-----------------------------------
1 - VALOR DAS CANECAS
2 - VERIFICAR TAXA DE ENTREGA
`
    await instanceBot.sendText({ to: from, message })
  }
}

const options = {
  1: () => {
    let message = '*Preços*'

    return {
      message,
      nextStage: STAGES.PRECO,
    }
  },
  2: () => {
    const message =
      'FAZER PEDIDO'

    return {
     message,
      nextStage: STAGES.PRECO,
    }
  },
  0: () => {
    return {
      message:
        'RETORNO',
    }
  }
}