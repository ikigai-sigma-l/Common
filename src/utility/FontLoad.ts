
type FontData = { family: string, src: string, weight: string, style: string}

export class FontLoad {
    private loader: Promise<void> | null = null

    private load (data: FontData) {
        return new FontFace(data.family, data.src, { weight: data.weight, style: data.style })
            .load().then((font: FontFace) => {
                document.fonts.add(font)
            })
    }

    private add (data: FontData) {
        return `@font-face { font-family: '${data.family}'; src: ${data.src}; font-weight: ${data.weight}; font-style: ${data.style}; }\n`
    }

    private addStyle(list: FontData[]) {
        const style = document.createElement('style')
        let fontFace = ''
        
        list.forEach((item, idx) => {
            fontFace += this.add(item)
        })
        style.innerText = fontFace
        document.head.appendChild(style)
    }

    constructor(list: FontData[]) {

        this.loader = new Promise((resolve, reject) => {
            let promiser: Promise<any> = Promise.resolve()
            list.forEach((item, idx) => {
                promiser = promiser.then(() => {
                    return this.load(item)
                })
            })
        
            promiser
            .then(() => {
                this.addStyle(list)
                resolve()
            })
            .catch((ex) => {
                console.error(ex)
                reject(ex)
            })
        })
    }

    public onComplete(callback: () => void) {
        let handler = () => {}
        new Promise<void>((resolve, reject) => {
          this.loader?.then(() => {
            resolve()
          })
          handler = reject
        })
          .then(() => {
            callback()
          })
          .catch(() => {})
    
        return handler
      }
}