import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const Select = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  error,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-primary">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 border-2 border-gray-200 rounded-button focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300 bg-white appearance-none ${error ? 'border-error focus:border-error focus:ring-error/20' : ''} ${className}`}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ApperIcon 
          name="ChevronDown" 
          size={20} 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
        />
      </div>
      {error && (
        <p className="text-sm text-error font-medium">{error}</p>
      )}
    </div>
  )
}

export default Select