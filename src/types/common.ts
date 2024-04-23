export type TokenTransferTxInfo = {
    model: "RECEIVE",
    txSignature: string,
    amount: number
    sender: string,
    receiver: string,
} | {
    model: "SEND",
    txSignature: string,
    amount: number
    sender: string,
    receiver: string,
}

export type SolTransferTxInfo = {
    sender: string,
    receiver: string,
    amount: number,
    txSignature: string
}

export type AddWalletSessionInfo = {
    wallet?: string
}
export type RemoveWalletSessionInfo = {
    wallet?: string
}