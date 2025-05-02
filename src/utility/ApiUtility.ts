import { ActivateResponse, ActivateResponseData } from 'src/schame/ActiveResponse';
import { Utils } from './Utils';
import { APIHelper } from './APIHelper';
import { useActiveResultStore } from 'src/stores/useActiveResultStore';
import { useGameUiStore } from 'src/stores/useGameUiStore';

export const API_ROUTE = {
    ACTIVATE: 'v2/exp/session/activate',
    BET: 'v2/exp/play/bet',
    ACTION: 'v2/exp/play/action',
    FINISH: 'v2/exp/play/finish',
    RESTORE: 'v2/exp/play/restore',
    ROUND_LIST: 'v2/service/play/rounds-list',
    BALANCE: 'v2/exp/play/balance',
    PUBLIC: 'v2/exp/session/public',
}
  
export type STAKE_TYPE = 'commonGame' | 'buyBonusGame' | 'anteBet'
  
export type BET_TYPE = 'regular' | 'freeSpin'

type SessionData = {
    domain: string,
    token: string,
}

const sessionData: SessionData = {
    domain: '',
    token: '',
} 

export class ApiUtil {

    public static initialize(token: string, domain: string) {
        sessionData.token = token
        sessionData.domain = domain

        return ApiUtil.activate()
                        .then((resp) => {
                          console.log(JSON.stringify(resp))
                            useActiveResultStore.setState({data: resp})
                            useGameUiStore.betValue.set(resp.ui.bets.find(val => val.default)?.value ?? 2)
                            useGameUiStore.balance.set(resp.ui.balance)
                            return Promise.resolve().then(() => {
                                return resp.restore
                            })
                        })
    }

    public static async activate(): Promise<ActivateResponseData> {
        const url = `${sessionData.domain}/${API_ROUTE.ACTIVATE}`
        const params = {
          token: sessionData.token,
          ts: new Date().getTime(),
          analytics: {
            language: navigator.language,
            device: Utils.getDeviceType(),
            resolution: {
              w: Utils.getResolution().w,
              h: Utils.getResolution().h,
            },
            orientation: Utils.getOrientation(),
            connection: 'slow-2g',
          },
        }
        const response = await APIHelper.post<ActivateResponse>(url, params)
        const resp = response.data
        const data = resp.data
        return data
    }
}