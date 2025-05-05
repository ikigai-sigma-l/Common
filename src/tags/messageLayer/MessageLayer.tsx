import { useEffect, useRef, useState } from 'react'
import MessageBox from './messageBox/MessageBox'
import { ErrorType, useErrorCodeStore } from '../../stores/useErrorCodeStore'
import Malfunction from './malfunction/Malfunction'

export default function MessageLayer() {
    const { type, errorCode } = useErrorCodeStore()
    return (
        (errorCode != 0) && <div
            style={{
                position: 'fixed',
                width: '100dvw',
                height: '100dvh',
                backgroundColor: 'rgba(0,0,0,0.5)'
                //pointerEvents: 'none',
            }}
        >
            { type() == ErrorType.MessageBox ? <MessageBox /> : <Malfunction /> }
        </div>
    )
}
