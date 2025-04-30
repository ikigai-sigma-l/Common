export interface ErrorResponse {
    response?: {
      data?: {
        error?: {
          code: number
          message: string
        }
      }
    }
}