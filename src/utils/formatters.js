export const formatPrice = (price) => {
  if (typeof price !== 'number') return '$0'
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export const formatDate = (dateInput) => {
  // Handle null, undefined, or empty string
  if (!dateInput && dateInput !== 0) return ''
  
  let date
  
  // Handle different input types
  if (dateInput instanceof Date) {
    date = dateInput
  } else if (typeof dateInput === 'number') {
    // Handle timestamp (both seconds and milliseconds)
    date = new Date(dateInput < 10000000000 ? dateInput * 1000 : dateInput)
  } else if (typeof dateInput === 'string') {
    // Handle ISO strings and other date formats
    date = new Date(dateInput)
  } else {
    console.warn('formatDate: Invalid date input type:', typeof dateInput, dateInput)
    return ''
  }
  
  // Validate the date object
  if (isNaN(date.getTime())) {
    console.warn('formatDate: Invalid date value:', dateInput)
    return ''
  }
  
  try {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  } catch (error) {
    console.error('formatDate: Formatting error:', error, dateInput)
    return ''
  }
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
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) return '0%'
  
  try {
    return `${value.toFixed(decimals)}%`
  } catch (error) {
    console.error('formatPercentage: Formatting error:', error, value)
    return '0%'
  }
}