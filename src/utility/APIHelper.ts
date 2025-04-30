import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ErrorResponse } from '../schame/ErrorResponse'
import { useEnvironmentStore } from '../stores/useEnvironmentStore'
import { useErrorCodeStore } from '../stores/useErrorCodeStore'

interface RetryConfig {
  maxRetries: number
  retryDelay: number
  timeout: number
}
interface RequestParams {
  token?: string
  [key: string]: unknown
}

export class APIHelper {
  private static readonly DEFAULT_RETRY_CONFIG: RetryConfig = {
    maxRetries: 1,
    retryDelay: 1,
    timeout: 0,
  }
  public static isDemo = false

  public static async get<T = void>(
    url: string,
    config?: AxiosRequestConfig,
    retryConfig: Partial<RetryConfig> = {}
  ): Promise<T extends void ? void : AxiosResponse<T>> {
    const finalRetryConfig = { ...this.DEFAULT_RETRY_CONFIG, ...retryConfig }
    let retries = 0

    while (true) {
      try {
        const startTime = new Date().getTime()

        useEnvironmentStore.lastActTime.set(startTime)

        const axiosConfig: AxiosRequestConfig = {
          ...config,
          timeout: finalRetryConfig.timeout,
        }
        //if timeout:0 mean never timeout
        const response = await axios.get<T>(url, axiosConfig)

        const endTime = new Date().getTime()
        const duration = endTime - startTime

        if (typeof window !== 'undefined' && window.gtag) {
          const urlObj = url.split('/')
          const apiName = urlObj[urlObj.length - 1]
          window.gtag('event', 'latency_record_event', {
            // event_name: apiName,
            [apiName]: duration,
            partner_name: 0,
            latency: duration,
          })
        }

        return response as T extends void ? void : AxiosResponse<T>
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status) {
            if (error.response?.status >= 400 && error.response?.status < 500) {
              this.handleErrorCode(error)
              throw error
            }
          }
        }
        if (this.isDemo) {
          throw error
        }

        retries++
        console.log(`API call failed, attempt ${retries} of ${finalRetryConfig.maxRetries}`)

        if (finalRetryConfig.maxRetries > 0 && retries >= finalRetryConfig.maxRetries) {
          useErrorCodeStore.setState({errorCode: (error as any).response?.status ?? 500})
          throw error
        }

        await new Promise((resolve) => setTimeout(resolve, finalRetryConfig.retryDelay))
      }
    }
  }

  public static async post<T = void>(
    url: string,
    params: RequestParams,
    config?: AxiosRequestConfig,
    retryConfig: Partial<RetryConfig> = {}
  ): Promise<T extends void ? void : AxiosResponse<T>> {
    const finalRetryConfig = { ...this.DEFAULT_RETRY_CONFIG, ...retryConfig }
    let retries = 0

    while (true) {
      try {
        const startTime = new Date().getTime()

        useEnvironmentStore.lastActTime.set(startTime)

        const axiosConfig: AxiosRequestConfig = {
          ...config,
          timeout: finalRetryConfig.timeout,
        }
        //if timeout:0 mean never timeout
        const response = await axios.post<T>(url, params, axiosConfig)

        const endTime = new Date().getTime()
        const duration = endTime - startTime

        if (typeof window !== 'undefined' && window.gtag) {
          const urlObj = url.split('/')
          const apiName = urlObj[urlObj.length - 1]
          window.gtag('event', 'latency_record_event', {
            // event_name: apiName,
            [apiName]: duration,
            partner_name: 0,
            latency: duration,
            // test: [{ startDate: '7daysAgo', endDate: 'today' }],
          })
        }

        return response as T extends void ? void : AxiosResponse<T>
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status) {
            if (error.response?.status >= 400 && error.response?.status < 500) {
              this.handleErrorCode(error)
              throw error
            }
          }
        }
        if (this.isDemo) {
          throw error
        }

        retries++
        console.log(`API call failed, attempt ${retries} of ${finalRetryConfig.maxRetries}`)

        if (finalRetryConfig.maxRetries > 0 && retries >= finalRetryConfig.maxRetries) {
          useErrorCodeStore.setState({errorCode: (error as any).response?.status ?? 500})
          throw error
        }

        await new Promise((resolve) => setTimeout(resolve, finalRetryConfig.retryDelay))
      }
    }
  }

  public static async delete<T = void>(
    url: string,
    config: AxiosRequestConfig
  ): Promise<T extends void ? void : AxiosResponse<T>> {
    try {
      const response = await axios.delete<T>(url, config)
      return response as T extends void ? void : AxiosResponse<T>
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status && error.response.status >= 400) {
          throw error
        }
      }
      throw error
    }
  }

  public static handleErrorCode(error: ErrorResponse) {
    if (!error || typeof error !== 'object' || !('response' in error)) {
      return
    }

    const errorData = error.response?.data?.error
    if (!errorData) {
      return
    }

    const { code, message } = errorData
    useErrorCodeStore.setState({errorCode: code})
    console.error(`Error Code: ${code}, Message: ${message}`)
  }
}
