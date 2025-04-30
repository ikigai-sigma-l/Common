import axios from 'axios'
import { DEV_USER, GAME_CODE, GAME_CURRENCY, LAUNCH_SIGNATURE, LAUNCH_URL, GAME_LANGUAGE } from '../types/common'

interface LaunchResponseData {
    url: string
    session: string
}

interface LaunchResponse {
    data: LaunchResponseData
}

export class Sandbox {

    public static async launch() {
        const url = LAUNCH_URL
        const params = {
                gameCode: GAME_CODE,
                brandCode: "slotBrand",
                currencyCode: GAME_CURRENCY,
                playerId: DEV_USER,
                currencyId: 1,
                balance: 4122.6,
                session: "ss1",
                country: "GB",
                lang: GAME_LANGUAGE,
                lastIp: "127.0.0.1",
                urls: {
                    "deposit": "https://www.test.com",
                    "lobby": "https://www.test.com"
                }
        }

        const response = await axios.post<LaunchResponse>(url, params, {
            headers: { 'x-service-signature' : LAUNCH_SIGNATURE }
        })

        console.log(JSON.stringify(response))

        const search = response.data.data.url.split('?')

        const urlParams = new URLSearchParams(search[search.length - 1])

        return {
            token: urlParams.get('token') ?? '',
            domain: urlParams.get('cb') ?? ''
        }
    }
}