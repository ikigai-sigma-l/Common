import { useEffect, useRef } from 'react'
import clsx from 'clsx'
import { useErrorCodeStore } from '../../../stores/useErrorCodeStore'
import SVGCross from '../../../tags/messageLayer/messageBox/SVGCross.svg'
import { Utils } from '../../../utility/Utils'

export default function MessageBox() {
  const { setting } = useErrorCodeStore()
  const isMobile = Utils.isMobile

  const onClose = () => {
    useErrorCodeStore.setState({errorCode: 0})
  }

  const conf = setting()

  return (
    <div className=' w-full h-full center'
    >
        <div className={clsx('dialog', {isMobile : isMobile})}>
            <div className='relative'>
            <h1 className={clsx('text-shadow', {isMobile : isMobile})}>{conf.title}</h1>
            <h1 className={clsx('text-header', {isMobile : isMobile})}>{conf.title}</h1>
            </div>
            <h2 className={clsx({isMobile : isMobile})}>{conf.content}</h2>
            <div className={clsx('flex', 'items-start', 'gap-[1rem]',{isMobile : isMobile})}>
              {
                conf.btns.map((btn, idx) => {
                  return (
                    <button key={idx} className={clsx('center',{isMobile : isMobile})} onClick={btn.onClick}>
                      <div className='relative'>
                      <p className={clsx('text-shadow', {isMobile : isMobile})}>{btn.message}</p>
                      <p className={clsx('text-button', {isMobile : isMobile})}>{btn.message}</p>
                      </div>
                    </button>
                  )
                })
              }
            </div>
            {
              conf.showClose && <div className='close grid center' onClick={onClose}><img className=' w-[1.17675rem] h-[1.1767rem]' src={SVGCross} /></div>
            }
        </div>
    </div>
  )
}
