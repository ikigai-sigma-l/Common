import { language } from '../utility/Language'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { useActiveResultStore } from './useActiveResultStore'

export enum ErrorType {
    MessageBox,
    Malfunction,
}

export interface IErrorButton {
    message: string,
    onClick: () => void
}

export interface IError {
    title: string
    content: string
    btns: IErrorButton[]
    showClose?: boolean
}

export interface IErrorCodeStore {
  errorCode: number
  setting: () => IError
  type: () => ErrorType
}

export const useErrorCodeStore = create<IErrorCodeStore>()(
    subscribeWithSelector((set, get) => ({
        errorCode: 0,

        setting: () => {
            const { errorCode } = get()

            switch (errorCode) {
                case 12007:
                case 12014:
                    return {
                        title: language.text('POPUP_INSUFFICIENT_FUNDS'),
                        content: language.text('POPUP_INSUFFICIENT_MESSAGE'),
                        btns: [{
                            message: language.text('POPUP_INSUFFICIENT_OK'),
                            onClick: () => { set({errorCode: 0}) }
                        }],
                        showClose: true
                    }
                case 10013:
                case 12015:
                    const setting = {
                        title: language.text('POPUP_INSUFFICIENT_FUNDS'),
                        content: language.text('POPUP_INSUFFICIENT_MESSAGE'),
                        btns: [{
                            message: language.text('POPUP_INSUFFICIENT_OK'),
                            onClick: () => { set({errorCode: 0}) }
                        }],
                        showClose: false
                    }

                    const depositURL = useActiveResultStore.getState().getDepositURL()
                    if (depositURL) {
                        setting.btns.push({
                            message: language.text('POPUP_INSUFFICIENT_DEPOSIT'),
                            onClick: () => { 
                                window.parent.location.href = depositURL
                                window.parent.postMessage({ action: 'refresh', url: depositURL }, '*')
                            }
                        })
                    }
                    return setting
                case 12001:
                case 12002:
                case 12003:
                case 12004:
                case 12010:
                case 12011:
                case 12012:
                case 12013:
                case 12016:
                    return {
                        title: language.text('POPUP_OOPS'),
                        content: language.text('POPUP_SOMETHING_WRONG'),
                        btns: []
                    }
                case 12019:
                    return {
                        title: language.text('POPUP_OOPS'),
                        content: language.text('POPUP_JURISDICTION_RESTRICTIONS'),
                        btns: []
                    }
                case 12005:
                    return {
                        title: language.text('POPUP_MAINTENANCE_TITLE'),
                        content: language.text('POPUP_MAINTENANCE_DESCRIPTION'),
                        btns: []
                    }
                case 12006:
                    return {
                        title: language.text('POPUP_OOPS'),
                        content: language.text('POPUP_TRY_AGAIN'),
                        btns: []
                    }
                default:
                    return {
                        title: language.text('POPUP_OOPS'),
                        content: language.text('POPUP_MAINTENANCE_DESCRIPTION'),
                        btns: [{
                            message: 'reload the game',
                            onClick: () => location.reload()
                        }]
                    }
            }
        },

        type: () => {
            const { errorCode } = get()

            switch (errorCode) {
                case 12007:
                case 12014:
                case 10013:
                case 12015:
                    return ErrorType.MessageBox
                    
                default:
                    return ErrorType.Malfunction
            }
        }
    }))
)
