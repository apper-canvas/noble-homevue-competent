import React from 'react'

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
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
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 border-2 border-gray-200 rounded-button focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300 bg-white ${error ? 'border-error focus:border-error focus:ring-error/20' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-error font-medium">{error}</p>
      )}
    </div>
  )
}

export default Input