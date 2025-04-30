export interface BalanceResponseData {
    session: string
    status: string
    balance: number
}

export interface BalanceResponse {
    data: BalanceResponseData
}