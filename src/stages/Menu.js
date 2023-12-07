import { Bot } from '../bot.js'
import { products } from '../products/products.js'
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
    let message = '💸💸💸 *Valor das Canecas* 💸💸💸 \n\n'

    Object.keys(products).forEach((value) => {
      message += `${products[value].description} - R$ ${products[value].price},00\n`
    })
    message += `
Todos os preços já estão inclusos a arte, você pode colocar o que quiser na caneca,
fotos, frases, desenhos e etc.`
    message += msgDefault;
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
Em outras cidades consultar valor do frete com nossos vendedores.`
    message += msgDefault;
    return {
      message,
      nextStage: STAGES.MENU,
    }
  },
  //Fazer um pedido
  3: () => {
    let message = '*Produtos*\n\n'

    Object.keys(products).forEach((value) => {
      message += `${numbers[value]} - _${products[value].description}_ - R$ ${products[value].price},00\n`
    })
    message += `⚠️Selecione um produto de cada vez.⚠️`

    return {
      message,
      nextStage: STAGES.PEDIDO,
    }
  },
}

let msgDefault = `
-----------------------------------
1️⃣ - Valor das Canecas
2️⃣ - Taxa de Entrega
3️⃣ - Fazer Pedido
`
const numbers = {
  1: '1️⃣',
  2: '2️⃣',
  3: '3️⃣',
  4: '4️⃣',
  5: '5️⃣',
}