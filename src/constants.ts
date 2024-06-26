import { config } from 'dotenv'
config();

const heliusApiKey = process.env.HELIUS_API_KEY
const heliusWebHookId = process.env.HELIUS_WEBHOOK_ID
const ngrokAuthToken = process.env.NGROK_AUTH_TOKEN
const botToken = process.env.BOT_TOKEN
const IN_PRODUCTION = process.env.PRODUCTION == '1' ? true : false
const RPC_ENDPOINT = process.env.RPC_ENDPOINT
if (!ngrokAuthToken) throw "ERROR: ngrok auth token not Found"
if (!botToken) throw "ERROR: Bot token not found"
if (!RPC_ENDPOINT) throw "Err: no rpc url"

export const logo = "https://i.imgur.com/BG3LHXi.mp4"


const mainnetRcpUrl = "https://api.mainnet-beta.solana.com"
const devnetRpcUrl = "https://api.devnet.solana.com"
const rpcEndpointUrl = IN_PRODUCTION ? mainnetRcpUrl : devnetRpcUrl

export const ENV = {
    heliusApiKey,
    rpcEndpointUrl,
    heliusWebHookId,
    ngrokAuthToken,
    botToken,
    RPC_ENDPOINT,
}