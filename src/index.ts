import { bot } from "./bot";
import { ENV } from "./constants";
import WatcherBot from "./solWatcher";

const log = console.log;
require('dotenv').config();
export const defaultBotSendMsgOpt = { link_preview_options: { is_disabled: true }, parse_mode: "Markdown" } as any

// .env
const { ngrokAuthToken, } = ENV;
const solWatcherBot = new WatcherBot({
  ngrokAuthToken,
});
solWatcherBot.start().then((res) => { log("server started ...") })

// bot command
bot.command("hi", async ctx => {
  ctx.reply("hello")
})

// bot.command("add", async ctx => {
//   ctx.session.process = { current: "ADD_WALLED" }
//   await ctx.reply("Enter the wallet address to add")
// })

// bot.command('remove', async ctx => {
//   ctx.session.process = { current: "REMOVE_WALLED" }
//   await ctx.reply("Enter the wallet address to remove")
// })

bot.command('watch', async ctx => {
  
  // let msg = `*Wallets And Balances*\n`
  // for (let { wallet, balance } of walletsAndBalance) {
  //   if (balance > 1) {
  //     msg += `${abbreviateWalletAddress(wallet)} *${balance.toFixed(2)}*\n`
  //   }
  // }
  // await ctx.reply(msg, defaultBotSendMsgOpt)
})

// bot.on('message:text', async ctx => {
//   const msg = ctx.message.text ?? ""
//   const chatId = ctx.chat.id
//   const currentSession = ctx.session.process.current
//   if (currentSession == 'ADD_WALLED' || currentSession == 'REMOVE_WALLED') {
//     const wallet = getPubkeyFromMsg(msg)
//     if (!wallet) {
//       await ctx.reply("Please enter valid wallet address")
//       return
//     }
//     closeSession(ctx.session)
//     if (currentSession == 'ADD_WALLED') {
//       await solWatcherBot.addWalletToTrack(wallet.toBase58(), chatId)
//       await ctx.reply("Wallet successfully added")
//     } else {
//       await solWatcherBot.removeWalletToTrack(wallet.toBase58(), chatId)
//       await ctx.reply("Wallet is removed")
//     }
//     return
//   }
// })

async function startBotServer() {
  bot.start().then(() => {
    console.log("bot is running ...")
  }).catch(() => {
    startBotServer();
  })
}
startBotServer()