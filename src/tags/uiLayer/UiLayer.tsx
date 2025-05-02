import { useEffect, useRef } from 'react'

export default function UiLayer() {
  return (
    <div
      id='UiLayer'
      style={{
        //display: 'none',
        position: 'fixed',
        pointerEvents: 'none',
      }}
    >
    </div>
  )
}
