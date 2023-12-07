import { Bot } from './bot.js'
import { stages, getStage } from './stages.js'

const main = async () => {
  try {
    const instanceBot = await Bot.getInstance().init({
      session: 'Dabel Personalizados',
      headless: 'new',
      useChrome: false,
    })

    instanceBot.onMessage(async (message) => {
      if (message.isGroupMsg) return

      const currentStage = getStage({ from: message.from })

      await stages[currentStage].stage.exec({
        from: message.from,
        message: message.body,
      })
    })
  } catch (error) {
    console.error(error)
  }
}

main()