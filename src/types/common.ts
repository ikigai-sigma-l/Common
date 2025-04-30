const params = new URLSearchParams(document.location.search)

export const IS_DEV = import.meta.env.VITE_ENV == 'dev'
export const DEV_USER = import.meta.env.VITE_DEV_USER
export const IS_OFFLINE = IS_DEV && !DEV_USER
export const LAUNCH_URL = import.meta.env.VITE_LAUNCH_URL
export const LAUNCH_SIGNATURE = import.meta.env.VITE_LAUNCH_SIGNATURE
export const GAME_CODE = import.meta.env.VITE_GAME_CODE
export const GAME_CURRENCY = import.meta.env.VITE_GAME_CURRENCY
export const GAME_LANGUAGE = import.meta.env.VITE_GAME_LANGUAGE
export const SHOW_FPS = import.meta.env.VITE_SHOW_FPS
export const TOKEN = params.get('token') ?? ''
export const DOMAIN = params.get('cb') ?? ''

export type Nullable<T> = {
  [P in keyof T]: T[P] | null
}