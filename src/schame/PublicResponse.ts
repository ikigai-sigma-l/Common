export interface PublicResponseData {
    session: { sessionId: string; status: string }
}

export interface PublicResponse {
    data: PublicResponseData
}