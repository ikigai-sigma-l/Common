interface GtagEventParams {
    partner_name: number
    latency: number
    [key: string]: string | number | boolean | undefined | object
  }
  interface Window {
    gtag: (command: 'event', action: string, params: GtagEventParams) => void
  }
  
  declare function gtag(command: 'event', action: string, params: GtagEventParams): void