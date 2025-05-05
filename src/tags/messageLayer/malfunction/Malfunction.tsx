import { useEffect, useRef } from 'react'
import clsx from 'clsx'
import { useErrorCodeStore } from '../../../stores/useErrorCodeStore'
import { Utils } from '../../../utility/Utils'

export default function Malfunction() {
  const { setting } = useErrorCodeStore()
  const isPortrait = Utils.isPortrait
  const isMobile = Utils.isMobile

  const conf = setting()

  return (
    <div className=' w-full h-full center bg-black'
    >
        <div className={clsx('malfunction', {isMobile : isMobile}, {isPortrait : isPortrait})}>
            <div className=' relative'>
              <h1 className={clsx('text-shadow', {isMobile : isMobile})}>{conf.title}</h1>
              <h1 className={clsx('text-header', {isMobile : isMobile})}>{conf.title}</h1>
            </div>
            <h2 className={clsx({isMobile : isMobile})}>{conf.content}</h2>
            <div className={clsx('center', 'gap-[1rem]', {isMobile : isMobile})}>
              {
                conf.btns.map((btn, idx) => {
                  return (
                    <button key={idx} className={clsx({isMobile : isMobile})} onClick={btn.onClick}>
                      <div className=' relative'>
                        <p className={clsx('text-shadow', {isMobile : isMobile})}>{btn.message}</p>
                        <p className={clsx('text-button', {isMobile : isMobile})}>{btn.message}</p>
                      </div>
                    </button>
                  )
                })
              }
            </div>
        </div>
    </div>
  )
}
