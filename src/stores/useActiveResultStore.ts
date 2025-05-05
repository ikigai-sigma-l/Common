import { ActivateResponseData, BetData, CurrencyData, StakeMode } from 'src/schame/ActiveResponse'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

type ActiveResult = {
    data: ActivateResponseData | undefined,

    getAccessToken: () => string
    getSessionID: () => string
    getPlayerID: () => string
    getStakeMode: (type: string) => StakeMode
    getBets: () => BetData[]
    getMinBet: () => number
    getMaxBet: () => number
    getCurrency: () => CurrencyData
    getLanguage: (id: string) => string | null
    getDepositURL: () => string
}

export const useActiveResultStore = create<ActiveResult>()(
    subscribeWithSelector((set, get) => ({
        data: undefined,

        getAccessToken: () => {
            return get().data?.accessToken ?? ''
        },

        getSessionID: () => {
            return get().data?.session ?? ''
        },

        getPlayerID: () => {
            return get().data?.playerId ?? ''
        },

        getStakeMode: (type: string) => {
            return get().data?.ui.stakeModes.find((stake) => stake.type === type)!
        },

        getBets: () => {
            return get().data?.ui.bets ?? [
                {
                  "type": "regular",
                  "value": 0.25,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 0.5,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 0.75,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 1,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 1.25,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 1.5,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 1.75,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 2,
                  "default": true
                },
                {
                  "type": "regular",
                  "value": 2.25,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 2.5,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 3,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 3.5,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 4,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 6,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 8,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 10,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 12,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 16,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 20,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 25,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 30,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 40,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 50,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 60,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 80,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 100,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 120,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 140,
                  "default": false
                },
                {
                  "type": "regular",
                  "value": 160,
                  "default": false
                }
              ]
        },

        getMinBet: () => {
          const bets = get().getBets()
          return bets[0].value
        },

        getMaxBet: () => {
          const bets = get().getBets()
          return bets[bets.length - 1].value
        },

        getCurrency: () => {
            return get().data?.ui.currency ?? {
                code: 'EUR',
                decimals: 2
            }
        },

        getLanguage: (id: string) => {
          const lang = get()?.data?.languages
          return lang ? Object.entries(lang).find(([key, val]) => key === id)?.[1] : ''
        },

        getDepositURL: () => {
          return get().data?.ui.urls.deposit ?? ''
        }
    }))
)
