import { Bot } from '../bot.js'
import { storage } from '../storage.js'
import { STAGES, WelcomeMessage } from './index.js'

export const Menu = {
  async exec(params) {
    const message = params.message.trim()
    const isValidMessage = /[1|2|3]/.test(message)

    let response = `*Digite uma opção válida, por favor.*`

    if (isValidMessage) {
      const option = options[Number(message)]()
      response = option.message
      storage[params.from].stage = option.nextStage || STAGES.WELCOME
    }

    await Bot.getInstance().sendText({ to: params.from, message: response })

    if (storage[params.from].stage === STAGES.WELCOME) {
      await WelcomeMessage.exec(params)
    }
  }
}

//Ultimo estágio do atendimento caso eu vá usar
// else if (storage[params.from].stage === STAGES.FALAR_COM_ATENDENTE) {
//   storage[params.from].finalStage = {
//     startsIn: new Date().getTime(),
//     endsIn: new Date().setSeconds(60), // 1 minute of inactivity

//Opções do menu inicial do bot....
const options = {
  //Valor dos produtos
  1: () => {
    let message = `
💸💸💸  *Valores*  💸💸💸
Canecas brancas: *R$ 35,00*
Canecas coloridas: *R$ 40,00*
Canecas com alça coração: *R$ 45,00*
Todos os preços já estão inclusos a arte, você pode colocar o que quiser na caneca,
fotos, frases, desenhos e etc.
-----------------------------------
1 - Valor das Canecas
2 - Taxa de Entrega
3 - Fazer Pedido
`
    return {
      message,
      nextStage: STAGES.MENU,
    }
  },
  //Valor da Taxa de entrega
  2: () => {
    let message = `
🚉🚉🚉  *Taxa de entrega*  🚉🚉🚉
Dentro da Cidade de Rio Brilhante - Ms: *R$ 0,00*
Em outras cidades consultar valor do frete com nossos vendedores.
-----------------------------------
1 - Valor das Canecas
2 - Taxa de Entrega
3 - Fazer Pedido
`
    return {
      message,
      nextStage: STAGES.MENU,
    }
  },
  //Fazer um pedido
  3: () => { },
}