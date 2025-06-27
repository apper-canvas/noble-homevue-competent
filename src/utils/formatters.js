export const formatPrice = (price) => {
  if (typeof price !== 'number') return '$0'
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export const formatDate = (dateString) => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export const formatNumber = (number) => {
  if (typeof number !== 'number') return '0'
  
  return new Intl.NumberFormat('en-US').format(number)
}

export const formatSquareFeet = (sqft) => {
  if (typeof sqft !== 'number') return '0 sqft'
  
  return `${new Intl.NumberFormat('en-US').format(sqft)} sqft`
}

export const formatPercentage = (value, decimals = 1) => {
  if (typeof value !== 'number') return '0%'
  
  return `${value.toFixed(decimals)}%`
}