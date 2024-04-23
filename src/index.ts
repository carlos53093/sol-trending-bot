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

// async function startBotServer() {
//   bot.start().then(() => {
//     console.log("bot is running ...")
//   }).catch(() => {
//     startBotServer();
//   })
// }
// startBotServer()