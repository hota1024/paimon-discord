import { QuroBot, CommandFileLoader } from 'quro'
import * as dotenv from 'dotenv'
import * as path from 'path'
import { version } from '../package.json'
import { randomPick } from './helpers/randomPick'

dotenv.config()

class Bot extends QuroBot {
  prefixes = ['$']

  version = version

  /**
   * Setup.
   */
  async setup() {
    await this.registerDirectoryCommands('./commands')

    this.onReady(() => {
      console.log('Ready')
    })

    this.onMessage((message) => {
      if (message.author.bot) {
        return
      }

      if (message.content.includes('えへ')) {
        message.reply(`\n${message.content}ってなんだよ！`)
        return
      }

      if (message.content.includes('非常食')) {
        message.reply(
          `\n${randomPick([
            '全然違う！',
            'オイラは非常食じゃない！',
            '全然違う！マスコット以下じゃないか！',
          ])}`
        )
      }

      if (message.content.match(/(ぱちもん)|(パチもん)|(パチモン)/)) {
        message.reply('\nオイラは本物だぞ！')
      }
    })
  }

  /**
   * Register directory commands.
   *
   * @param directoryPath
   */
  private async registerDirectoryCommands(directoryPath: string) {
    const commandLoader = new CommandFileLoader()
    this.registerCommands(
      await commandLoader.load(path.resolve(__dirname, directoryPath))
    )
  }
}

const bot = new Bot()
bot.start(process.env.DISCORD_BOT_TOKEN)
