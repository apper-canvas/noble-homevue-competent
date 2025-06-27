import React from 'react'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No properties found", 
  description = "Try adjusting your search criteria or browse all available properties.",
  actionText = "Browse All Properties",
  onAction,
  icon = "Home"
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-premium">
          <ApperIcon name={icon} size={48} className="text-white" />
        </div>
        
        <h3 className="text-2xl font-display font-semibold text-primary mb-4 gradient-text">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          {description}
        </p>
        
        {onAction && (
          <button
            onClick={onAction}
            className="bg-gradient-secondary text-white px-8 py-3 rounded-button font-medium shadow-card hover:shadow-card-hover transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <ApperIcon name="Search" size={18} />
            {actionText}
          </button>
        )}
      </div>
    </div>
  )
}

export default Empty