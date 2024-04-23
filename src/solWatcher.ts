import { web3 } from "@project-serum/anchor";
import * as splToken from "@solana/spl-token";
import ngrok from '@ngrok/ngrok';
import express, { Request, Response } from 'express';
import { RayParsedTxInfo } from "./types/rayTxInfoType";
import fs from 'fs'
import { SolTransferTxInfo } from "./types/common";
import { bot } from "./bot";
import { getPubkeyFromMsg, getTxLink, sleep } from "./utils";
import { getMultipleAccountsAndContext } from "@project-serum/anchor/dist/cjs/utils/rpc";
import { SwapAmounts } from "./db";
import { Connection, PublicKey } from '@solana/web3.js'
import { PoolInfoLayout } from '@raydium-io/raydium-sdk'
import BN from 'bn.js'
import { logo } from './constants'

const log = console.log;
const todo: any = 1;
const poolAddress = '73r4FQ3N7Ghm7Sra6c57NyWxnx8sPcnGHZC3Gamyywco';
const OLAF = 'ASM4Xor9H8S7XURxFZ6xgcBNhD4f8HiqtsRoJReA7n2j'
const USDC = '6JF4vLGZowBYdhJENmm3Wy9RYFgAn5xpBtCf91gcDc9A'
// let tgGroupId = 7168334024
let tgGroupId = -4167748907

export class WatcherBot {
    private webhookURL?: string
    private ngrokAuthToken: string
    private connection: Connection

    constructor(config: {
        ngrokAuthToken: string,
    }) {
        this.ngrokAuthToken = config.ngrokAuthToken
        this.connection = new Connection("https://cosetta-6fo3hv-fast-mainnet.helius-rpc.com/")
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
            const subscriptionId = this.connection.onAccountChange(
                new PublicKey(poolAddress),
                async (info) => {
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
                            let text = "<b>Buy OLAF vs OLF!</b>" + `👑 \n\n` +
                                `🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣🟣\n\n` +
                                `Buy ${Math.abs(deltaB)} OSVO  \n` +
                                `Sell ${Math.abs(deltaA)} USDC ` +
                                `\n\n` +
                                `<a href="https://www.dextools.io/app/en/solana/pair-explorer/73r4FQ3N7Ghm7Sra6c57NyWxnx8sPcnGHZC3Gamyywco">DexT</a> | <a href="https://beta.raydium.io/swap/?inputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&outputMint=6TL1yMhrwoKNGW173bpyaxUyyJhrt7AVhV2EyLnqzDNv">Buy</a>`
                            
                            bot.api.sendPhoto(tgGroupId, logo, {
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