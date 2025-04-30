export const formatCurrency = (val: number, decimals: number) => {
    return val.toFixed(decimals)
    //return Math.abs(val).toLocaleString('en-us', { style: 'currency', currency: 'USD' })
}

export const formatNumber = (value: number|string, decimals: number, withFixed = false) => {
  if(typeof value === 'string') {
    value = parseFloat(value)
  }
  const THOUSANDS_SEPARATOR_REGEX = /\B(?=(\d{3})+(?!\d))/g;

  const formatWithThousandSeparation = (num: string): string =>
    num.replace(THOUSANDS_SEPARATOR_REGEX, ' ');

  const formattedValue = Number.isInteger(value) && !withFixed
    ? value.toString()
    : value.toFixed(decimals);

  return value >= 1000
    ? formatWithThousandSeparation(formattedValue)
    : formattedValue;
}

export const formatString = (template: string, ...values: any[]) => {
  return template.replace(/{(\d+)}/g, (_, index) => values[index].toString())
}
