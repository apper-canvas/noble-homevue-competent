import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  icon, 
  iconPosition = 'left',
  disabled = false,
  loading = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-button transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
  
  const variants = {
    primary: 'bg-gradient-secondary text-white shadow-card hover:shadow-card-hover',
    secondary: 'bg-gradient-accent text-white shadow-card hover:shadow-card-hover',
    outline: 'border-2 border-secondary text-secondary hover:bg-secondary hover:text-white',
    ghost: 'text-primary hover:bg-gray-100',
    danger: 'bg-gradient-to-r from-error to-red-400 text-white shadow-card hover:shadow-card-hover'
  }
  
  const sizes = {
    small: 'px-4 py-2 text-sm gap-1.5',
    medium: 'px-6 py-3 text-base gap-2',
    large: 'px-8 py-4 text-lg gap-2.5'
  }
  
  const IconComponent = icon && (
    <ApperIcon 
      name={icon} 
      size={size === 'small' ? 16 : size === 'large' ? 20 : 18} 
    />
  )
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <ApperIcon name="Loader2" size={18} className="animate-spin" />}
      {!loading && icon && iconPosition === 'left' && IconComponent}
      {children}
      {!loading && icon && iconPosition === 'right' && IconComponent}
    </button>
  )
}

export default Button