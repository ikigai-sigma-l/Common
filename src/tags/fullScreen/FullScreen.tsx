import { useEffect } from "react"
import { Utils, DEVICE_TYPE } from "src/utility/Utils"

interface FullscreenDocument extends Document {
  webkitFullscreenElement?: Element | null
  mozFullScreenElement?: Element | null
  msFullscreenElement?: Element | null
  webkitExitFullscreen?: () => Promise<void>
  mozCancelFullScreen?: () => Promise<void>
  msExitFullscreen?: () => Promise<void>
}

interface FullscreenElement extends Element {
  webkitRequestFullscreen?: () => Promise<void>
  mozRequestFullScreen?: () => Promise<void>
  msRequestFullscreen?: () => Promise<void>
}

class FullscreenUtil {
  public static isFullscreen = false

  public static async toggleFullscreen() {
    const dom = document.body as FullscreenElement
    if (!this.isFullscreen) {
      console.log('do fullscreen')
      try {
        if (dom.requestFullscreen) {
          await dom.requestFullscreen()
        } else if (dom.webkitRequestFullscreen) {
          await dom.webkitRequestFullscreen()
        } else if (dom.mozRequestFullScreen) {
          await dom.mozRequestFullScreen()
        } else if (dom.msRequestFullscreen) {
          await dom.msRequestFullscreen()
        }
        this.hideDomFullscreen()
      } catch (error) {
        console.error('Failed to enter fullscreen:', error)
      }
    } else {
      const doc = document as FullscreenDocument
      console.log('do exit fullscreen')
      try {
        if (doc.exitFullscreen) {
          await doc.exitFullscreen()
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen()
        } else if (doc.mozCancelFullScreen) {
          await doc.mozCancelFullScreen()
        } else if (doc.msExitFullscreen) {
          await doc.msExitFullscreen()
        }
      } catch (error) {
        console.error('Failed to exit fullscreen:', error)
      }
    }
  }

  public static fullscreenChangeHandler(): void {
    const doc = document as FullscreenDocument
    this.isFullscreen = Boolean(
      doc.fullscreenElement ?? doc.webkitFullscreenElement ?? doc.mozFullScreenElement ?? doc.msFullscreenElement
    )
    if (Utils.isMobile && !this.isFullscreen && Utils.getDeviceOs() != DEVICE_TYPE.IPHONE) {
      this.showDomFullscreen()
    }
  }
  private static showDomFullscreen() {
    const fullscreenDiv = document.getElementById('fullscreen')!
    fullscreenDiv.classList.remove('hide')
    fullscreenDiv.classList.remove('hideZIndex')
    fullscreenDiv.classList.add('show')
    fullscreenDiv.classList.add('showZIndex')
  }
  private static hideDomFullscreen() {
    const fullscreenDiv = document.getElementById('fullscreen')!
    fullscreenDiv.classList.remove('show')
    fullscreenDiv.classList.remove('showZIndex')
    fullscreenDiv.classList.add('hide')
    fullscreenDiv.classList.add('hideZIndex')
  }

  private static threshold = 50
  private static bindEvents(): void {
    const element = document.querySelector('.fs-scrollup')!
    window.visualViewport?.addEventListener('scroll', () => {
      const scrollTop = window.visualViewport?.pageTop ?? 0
      if (scrollTop > this.threshold) {
        element.classList.add('fs-touched')
      } else {
        element.classList.remove('fs-touched')
      }
    })
  }

  public static toggleFullscreenDiv(): void {
    if (!Utils.isMobile) {
      this.hideDomFullscreen()
    } else {
      const fullscreenDiv: HTMLDivElement | null = document.getElementById('fullscreen') as HTMLDivElement
      if (Utils.getDeviceOs() === DEVICE_TYPE.IPHONE) {
        this.hideDomFullscreen()
        fullscreenDiv.classList.add('fs-scrollup')
        fullscreenDiv.classList.add('fs-touched')
        this.bindEvents()
      } else {
        fullscreenDiv.classList.add('android-fullscreen')
        fullscreenDiv.addEventListener('click', () => {
          void this.toggleFullscreen()
        })
        //for future UI use
        setTimeout(() => {
          document.getElementById('fullscreenContainer')!.classList.add('hide')
        }, 1000)
      }
    }
  }
}

export default function FullScreen() {

  useEffect(() => {
    document.addEventListener('fullscreenchange', () => FullscreenUtil.fullscreenChangeHandler())
    document.addEventListener('webkitfullscreenchange', () => FullscreenUtil.fullscreenChangeHandler())
    document.addEventListener('mozfullscreenchange', () => FullscreenUtil.fullscreenChangeHandler())
    document.addEventListener('MSFullscreenChange', () => FullscreenUtil.fullscreenChangeHandler())

    FullscreenUtil.toggleFullscreenDiv()

    return () => {
      document.removeEventListener('fullscreenchange', () => FullscreenUtil.fullscreenChangeHandler())
      document.removeEventListener('webkitfullscreenchange', () => FullscreenUtil.fullscreenChangeHandler())
      document.removeEventListener('mozfullscreenchange', () => FullscreenUtil.fullscreenChangeHandler())
      document.removeEventListener('MSFullscreenChange', () => FullscreenUtil.fullscreenChangeHandler())
    }
  }, [])

  return (
    <div id="fullscreen" >
      <div id="fullscreenContainer">
        <div id="fullscreen-text"></div>
      </div>
    </div>
  )
}


