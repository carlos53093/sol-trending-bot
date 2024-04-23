import { web3 } from "@project-serum/anchor"
import { SesstionState } from "./bot"

export function getTxLink(connection: web3.Connection, txSignature: string) {
    const network = connection.rpcEndpoint == 'https://api.devnet.solana.com' ? 'devnet' : 'mainnet'
    if (network == 'devnet') {
        return `https://explorer.solana.com/tx/${txSignature}?cluster=devnet`
    }
    return `https://explorer.solana.com/tx/${txSignature}`
}
export function getAddressLink(connection: web3.Connection, address: string) {
    const network = connection.rpcEndpoint == 'https://api.devnet.solana.com' ? 'devnet' : 'mainnet'
    if (network == 'devnet') {
        return `https://explorer.solana.com/address/${address}?cluster=devnet`
    }
    return `https://explorer.solana.com/address/${address}`
    //TODO:
}

export async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function closeSession(session: SesstionState) {
    session.process = { current: "NULL", info: undefined }
}

export function getPubkeyFromMsg(msg?: string) {
    try {
        return new web3.PublicKey((msg ?? "").trim())
    } catch (error) {
        return null
    }
}

export function abbreviateWalletAddress(walletAddress: string) {
    const first4 = walletAddress.substring(0, 4);
    const last4 = walletAddress.substring(walletAddress.length - 4);

    return `${first4}...${last4}`;
}