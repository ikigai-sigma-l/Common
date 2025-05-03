export enum CustomEventList {
    SendBet = 'SendBet',
    PlaySpinGrow = 'PlaySpinGrow'
}

export class CustomEventUtility {
    public static addEvent(evt: CustomEventList, callback: () => void) {
        document.addEventListener(evt, callback)
    }

    public static removeEvent(evt: CustomEventList, callback: () => void) {
        document.removeEventListener(evt, callback)
    }

    public static dispatch(evt: CustomEventList) {
        document.dispatchEvent(new CustomEvent(evt))
    }
}