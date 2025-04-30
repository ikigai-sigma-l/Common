import * as PIXI from 'pixi.js'

export enum ImageType {
  Image = 'image',
  Atlas = 'atlas',
}
export interface GameLanguageSetting {
  uiFontName: string
  uiFont: string
  gameFontName: string
  gameFont: string
  version: string
}

export interface ImageSetting {
  type: ImageType
  image: string
  json?: string
}

export interface InfoSettingData {
  version: string
  gameCode: string
  language: Map<string, GameLanguageSetting>
  images?: ImageSetting[]
  fontWeightSetting: Map<string, PIXI.TextStyleFontWeight>
}

export interface InfoSettingResponse {
    data: InfoSettingData
}