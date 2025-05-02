import { useActiveResultStore } from "../stores/useActiveResultStore"

export const formatCurrency = (val: number) => {
    return val.toFixed(useActiveResultStore.getState().getCurrency().decimals)
    //return Math.abs(val).toLocaleString('en-us', { style: 'currency', currency: 'USD' })
}

export const formatNumber = (value: number|string, withFixed = false) => {
  if(typeof value === 'string') {
    value = parseFloat(value)
  }
  const THOUSANDS_SEPARATOR_REGEX = /\B(?=(\d{3})+(?!\d))/g;

  const formatWithThousandSeparation = (num: string): string =>
    num.replace(THOUSANDS_SEPARATOR_REGEX, ' ');

  const formattedValue = Number.isInteger(value) && !withFixed
    ? value.toString()
    : value.toFixed(useActiveResultStore.getState().getCurrency().decimals);

  return value >= 1000
    ? formatWithThousandSeparation(formattedValue)
    : formattedValue;
}

export const formatString = (template: string, ...values: any[]) => {
  return template.replace(/{(\d+)}/g, (_, index) => values[index].toString())
}
