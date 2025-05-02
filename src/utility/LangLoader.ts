import { GAME_CODE, GAME_LANGUAGE, LANG_DOMAIN } from "../types/common"
import { APIHelper } from "./APIHelper"
import { GameLanguageSetting, InfoSettingData, InfoSettingResponse } from "../schame/InfoSettingResponse"
import { FontLoad } from "./FontLoad"
import { language, LanguageStrings } from "./Language"

class LangLoader {
    private loader: Promise<void> | null = null
    
    constructor() {
        const domain = `${LANG_DOMAIN}/${GAME_CODE}/`
        this.loader =Promise.resolve().then(() => {
            const url = `${domain}info.json`
            return APIHelper.get<InfoSettingData>(url)
        }).then((resp) => {
            console.log(JSON.stringify(resp.data.language))
            const table = new Map<string, GameLanguageSetting>(Object.entries(resp.data.language))
            const setting = table.get(GAME_LANGUAGE)
            if (!setting) return Promise.reject(new Error(`unused language ${GAME_LANGUAGE}`))

            return new Promise<GameLanguageSetting>((resolve) => {
                new FontLoad([
                    {
                        family: `UiFont`,
                        src: `url('${domain}fonts/${setting.uiFont}') format('truetype')`,
                        weight: 'normal',
                        style: 'normal'
                    },
                    {
                        family: `UiFont`,
                        src: `url('${domain}fonts/${setting.uiFont}') format('truetype')`,
                        weight: 'bold',
                        style: 'normal'
                    },
                    {
                        family: `GameFont`,
                        src: `url('${domain}fonts/${setting.gameFont}') format('truetype')`,
                        weight: 'normal',
                        style: 'normal'
                    },
                ]).onComplete(() => {
                    resolve(setting)
                })
            }).then((setting) => {
                const url = `${domain}${GAME_LANGUAGE}/${GAME_CODE}.${GAME_LANGUAGE}.${setting.version}.json`
                return APIHelper.get<LanguageStrings>(url)
            }).then((resp) => {
                console.log(JSON.stringify(resp.data))
                language.initial(resp.data)
            })
        })
    }
    
    public onComplete(callback: () => void) {
        let handler = () => {}
        new Promise<void>((resolve, reject) => {
          this.loader?.then(() => {
            resolve()
          })
          handler = reject
        })
          .then(() => {
            callback()
          })
          .catch(() => {
            // use default fonts here
          })
    
        return handler
    }
}

export const langLoader = new LangLoader()



