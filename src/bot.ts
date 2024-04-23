import { Bot, Context, SessionFlavor } from "grammy";
import { session } from "grammy";
import { ENV } from "./constants";
import { AddWalletSessionInfo, RemoveWalletSessionInfo } from "./types/common";

export type SesstionState = {
    process: { current: 'ADD_WALLED', info?: AddWalletSessionInfo } |
    { current: 'REMOVE_WALLED', info?: RemoveWalletSessionInfo } |
    { current: 'NULL', info?: {} }
}
export type MyContext = Context & SessionFlavor<SesstionState>;

function initial(): SesstionState {
    return {
        process: { current: "NULL" },
    }
}
export const bot = new Bot<MyContext>(ENV.botToken);
bot.use(session({ initial }))

export default bot