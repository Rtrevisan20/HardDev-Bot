import { Bot } from '../bot.js'
import { storage } from '../storage.js'
import { STAGES } from './index.js'

export const estagioUm = {
  async exec(params) {
    const message = params.message.trim()
    const isMsgValid = /[0|1|2]/.test(message)

    let msg =
      '❌ *Digite uma opção válida, por favor.* \n ⚠️ ```APENAS UMA OPÇÃO POR VEZ``` ⚠️'
    if (isMsgValid) {
      const option = options[Number(message)]()
      msg = option.message
      storage[params.from].stage = option.nextStage || STAGES.INICIAL
    }

    await Bot.getInstance().sendText({ to: params.from, message: msg })

    if (storage[params.from].stage === STAGES.INICIAL) {
      await estagioInicial.exec(params)
    }
    else if (storage[params.from].stage === STAGES.PRECO) {
      storage[params.from].estagioUm = {
        startsIn: new Date().getTime(),
        endsIn: new Date().setSeconds(60), // 1 minute of inactivity
      }
    }
  }
}

const options = {
  1: () => {
    let message = '1: Voltar ao inicio'

    return {
      message,
      nextStage: STAGES.INICIAL,
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