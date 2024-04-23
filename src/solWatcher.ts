import { bot } from "./bot";
import { Connection, PublicKey } from '@solana/web3.js'
import { logo, ENV } from './constants'

const log = console.log;
const todo: any = 1;
const poolAddress = '73r4FQ3N7Ghm7Sra6c57NyWxnx8sPcnGHZC3Gamyywco';
const OLAF = 'ASM4Xor9H8S7XURxFZ6xgcBNhD4f8HiqtsRoJReA7n2j'
const USDC = '6JF4vLGZowBYdhJENmm3Wy9RYFgAn5xpBtCf91gcDc9A'
// let tgGroupId = 7168334024
let tgGroupId = -4167748907

export class WatcherBot {
    private ngrokAuthToken: string
    private connection: Connection

    constructor(config: {
        ngrokAuthToken: string,
    }) {
        this.ngrokAuthToken = config.ngrokAuthToken
        this.connection = new Connection(ENV.RPC_ENDPOINT)
    }

    async start() {
        try {
            let assetABalance: any;
            let assetBBalance: any;

            let oldA, oldB;
            try {
                assetABalance = await this.connection.getTokenAccountBalance(new PublicKey(USDC));
                assetBBalance = await this.connection.getTokenAccountBalance(new PublicKey(OLAF));
            } catch (err) {
                console.log(err)
                return;
            }
            console.log('-------------init---------------')
            console.log('--------oldA----------', oldA)
            console.log('--------assetA----------', assetABalance)
            console.log('--------oldB----------', oldB)
            console.log('--------assetB----------', assetBBalance)
            console.log('=====================================')

            bot.catch((e) => console.error(e));
            bot.start();
            const subscriptionId = this.connection.onLogs(
                new PublicKey(poolAddress),
                async (logs, ctx) => {
                    try {

                        try {
                            oldA = assetABalance;
                            oldB = assetBBalance;
                            assetABalance = await this.connection.getTokenAccountBalance(new PublicKey(USDC));
                            assetBBalance = await this.connection.getTokenAccountBalance(new PublicKey(OLAF));

                            console.log('--------oldA----------', oldA)
                            console.log('--------assetA----------', assetABalance)
                            console.log('--------oldB----------', oldB)
                            console.log('--------assetB----------', assetBBalance)

                            const deltaA = Math.round((assetABalance.value.uiAmount - oldA.value.uiAmount) * 100) / 100
                            const deltaB = Math.round((assetBBalance.value.uiAmount - oldB.value.uiAmount) * 100) / 100
                            if (deltaA <= 0) return
                            let text = "<b><a>$OVSO</a> Buy!</b>" + `\n` +
                                `💰⚡️💰⚡️💰⚡️💰⚡️💰⚡️💰⚡️💰⚡️💰⚡️💰⚡️💰⚡️`
                                for (let i = 0; i < deltaA; i = i + 5) {
                                    text =  text + ((i % 2) === 0 ? "💰" : "⚡️")
                                }
                                text = text + `🔀 Spent <b>$${Math.abs(deltaA)}</b>  \n` +
                                `\n\n🔀 Got <b>${Math.abs(deltaB)} OSVO</b>  \n` +
                                `👤 Buyer / <a href="https://solscan.io/tx/${logs.signature}">TX</a> \n` +
                                `🏷 Price <b>$${Math.round(assetABalance.value.uiAmount/assetBBalance.value.uiAmount * 1000000)/1000000}</b> \n` +
                                `💸 Market Cap $32,937,485` +
                                `\n\n` +
                                `<a href="https://www.dextools.io/app/en/solana/pair-explorer/73r4FQ3N7Ghm7Sra6c57NyWxnx8sPcnGHZC3Gamyywco">DexT</a> | <a hre="https://www.ovso.io/">Website</a> | <a href="https://beta.raydium.io/swap/?inputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&outputMint=6TL1yMhrwoKNGW173bpyaxUyyJhrt7AVhV2EyLnqzDNv">Buy</a>`
                            
                            bot.api.sendVideo(tgGroupId, logo, {
                                caption: text,
                                parse_mode: 'HTML'
                            })

                        } catch (err) {
                            console.log(err)
                            return;
                        }
                    } catch (e) {
                        log(":err:", e)
                    }

                },
                'confirmed'
            )
        } catch (error) {
            log({ error })
        }
    }

}
export default WatcherBot