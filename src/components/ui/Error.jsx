import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gradient-to-br from-error to-red-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-premium">
          <ApperIcon name="AlertTriangle" size={40} className="text-white" />
        </div>
        
        <h3 className="text-2xl font-display font-semibold text-primary mb-4">
          Oops! Something went wrong
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          {message}
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-gradient-secondary text-white px-8 py-3 rounded-button font-medium shadow-card hover:shadow-card-hover transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <ApperIcon name="RefreshCw" size={18} />
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}

export default Error