export interface LanguageStrings {
    ACCOUNT_BALANCE: string
    ACCOUNT_BET: string
    BET_STATE_IDLE: string
    BET_STATE_RUN: string
    BUY_ANTE_BET_DOUBLE: string
    BUY_ANTE_BET_CHANCE: string
    BUY_ANTE_BET_OF_FEATURES: string
    BUY_FREE_SPINS_BUY: string
    BUY_FREE_SPINS_FREE: string
    BUY_FREE_SPINS_SPINS: string
    HOLD_FOR_TURBO_SPIN: string
    BET_SELECT_THE_BET: string
    BIG_WIN_LETS_GO: string
    BIG_WIN_BIG_WIN: string
    BIG_WIN_MEGA_WIN: string
    BONUS_GAME_CONGRATULATIONS: string
    BONUS_GAME_YOU_WON: string
    BONUS_GAME_FREE_SPINS: string
    BONUS_GAME_IN_FREE_SPINS: string
    BONUS_GAME_WHEEL_FREE_SPINS1: string
    BONUS_GAME_WHEEL_FREE_SPINS2: string
    BONUS_GAME_YOU_REACHED: string
    BONUS_GAME_MAX_WIN: string
    AUTO_SPIN_TITLE: string
    AUTO_SPIN_ROUND: string
    AUTO_SPIN_CONFIRM: string
    SPIN_AUTO_TITLE: string
    SPIN_AUTO_INFO: string
    SPIN_FREE_TITLE: string
    SPIN_FREE_INFO: string
    GAME_SETTING_BATTERY_SAVER: string
    GAME_SETTING_AMBIENT_MUSIC: string
    GAME_SETTING_SOUND_FX: string
    GAME_SETTING_GAME_HISTORY: string
    GAME_SETTING_EXIT_GAME: string
    GAME_SETTING_BATTERY_SAVER_DESCRIPTION: string
    GAME_SETTING_AMBIENT_MUSIC_DESCRIPTION: string
    GAME_SETTING_SOUND_FX_DESCRIPTION: string
    POPUP_EXIT_GAME_MESSAGE: string
    POPUP_QUIT: string
    POPUP_CANCEL: string
    POPUP_INSUFFICIENT_FUNDS: string
    POPUP_INSUFFICIENT_MESSAGE: string
    POPUP_INSUFFICIENT_OK: string
    POPUP_INSUFFICIENT_DEPOSIT: string
    POPUP_QUICK_SPIN_TITLE: string
    POPUP_QUICK_SPIN_TEXT: string
    POPUP_QUICK_SPIN_QUICK: string
    POPUP_QUICK_SPIN_TURBO: string
    POPUP_QUICK_SPIN_CONFIRM: string
    POPUP_QUICK_SPIN_CANCEL: string
    POPUP_OOPS: string
    POPUP_SOMETHING_WRONG: string
    POPUP_TRY_AGAIN: string
    POPUP_JURISDICTION_RESTRICTIONS: string
    POPUP_MAINTENANCE_TITLE: string
    POPUP_MAINTENANCE_DESCRIPTION: string
    GAME_RESULT_WIN: string
    WIN_LINES: string
    BUY_ANTE_BET_ON: string
    BUY_ANTE_BET_OFF: string
    GAME_INFORMATION: string
    SYMBOLS: string
}

export interface StakeMode {
    type: string
    multiplier: number
    name: string
}

export interface BetData {
    type: string
    value: number
    default: boolean
}

export interface CurrencyData {
    code: string
    decimals: number
}

export interface ActivateResponseData {
    mode: string
    session: string
    accessToken: string
    callbackURL: string
    playerId: string
    ui: {
      bets: BetData[]
      stakeModes: StakeMode[]
      currency: CurrencyData
      balance: number
      autoSpinsEnabled: boolean
      auto: string[]
      urls: {
        lobby: string
        deposit: string
      }
      elements: object
    }
    languages: object
    gameElements: string
    game: string
    maxExposure: number
    restore: string
}

export interface ActivateResponse {
    data: ActivateResponseData
}