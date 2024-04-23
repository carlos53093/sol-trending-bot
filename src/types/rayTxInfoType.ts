type AccountData = {
    account: string;
    nativeBalanceChange: number;
    tokenBalanceChanges: {
        mint: string;
        rawTokenAmount: {
            decimals: number;
            tokenAmount: string;
        };
        tokenAccount: string;
        userAccount: string;
    }[];
}

export type InnerInstruction = {
    accounts: string[];
    data: string;
    programId: string;
}

export type InstructionInfo = {
    accounts: string[];
    data: string;
    innerInstructions: InnerInstruction[];
    programId: string;
}

type NativeTransfer = {
    amount: number;
    fromUserAccount: string;
    toUserAccount: string;
}

type TokenTransfer = {
    fromTokenAccount: string;
    fromUserAccount: string;
    mint: string;
    toTokenAccount: string;
    toUserAccount: string;
    tokenAmount: number;
    tokenStandard: string;
}

export type RayParsedTxInfo = {
    accountData: AccountData[],
    instructions: InstructionInfo[],
    nativeTransfers: NativeTransfer[],
    tokenTransfers: TokenTransfer[],
    description: string;
    events: {};
    fee: number;
    feePayer: string;
    signature: string;
    slot: number;
    source: string;
    timestamp: number;
    transactionError: null;
    type: string;
}
