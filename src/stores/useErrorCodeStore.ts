import { language } from 'src/utility/Language'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

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
                    return {
                        title: language.text('POPUP_INSUFFICIENT_FUNDS'),
                        content: language.text('POPUP_INSUFFICIENT_MESSAGE'),
                        btns: [{
                            message: language.text('POPUP_INSUFFICIENT_OK'),
                            onClick: () => { set({errorCode: 0}) }
                        },{
                            message: language.text('POPUP_INSUFFICIENT_DEPOSIT'),
                            onClick: () => { console.error('not implement yet') }
                        }],
                        showClose: false
                    }
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

                
                case 500:
                    return {
                        title: 'Status Code 500',
                        content: language.text('POPUP_SOMETHING_WRONG'),
                        btns: [{
                            message: language.text('POPUP_INSUFFICIENT_OK'),
                            onClick: () => { set({errorCode: 0}) }
                        }]
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
                case 12001:
                case 12002:
                case 12003:
                case 12004:
                case 12010:
                case 12011:
                case 12012:
                case 12013:
                case 12016:
                case 12019:
                    return ErrorType.MessageBox

                case 500:
                case 12005:
                case 12006:
                default:
                    return ErrorType.Malfunction
            }
        }
    }))
)
