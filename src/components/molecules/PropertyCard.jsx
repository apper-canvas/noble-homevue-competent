import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import { formatPrice, formatDate } from '@/utils/formatters'

const PropertyCard = ({ property, onToggleFavorite, isFavorite = false }) => {
  const [imageError, setImageError] = useState(false)
  
  const handleImageError = () => {
    setImageError(true)
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-card shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group"
    >
      <Link to={`/property/${property.id}`} className="block relative">
        <div className="relative overflow-hidden h-48">
          {!imageError && property.images?.[0] ? (
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <ApperIcon name="Home" size={48} className="text-gray-400" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-secondary text-white px-3 py-1 rounded-full text-sm font-medium shadow-card">
              {property.status}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="price-text text-2xl font-bold">
            {formatPrice(property.price)}
          </h3>
          <button
            onClick={() => onToggleFavorite(property.id)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <ApperIcon 
              name="Heart" 
              size={20} 
              className={`transition-colors duration-200 ${
                isFavorite ? 'text-error fill-current' : 'text-gray-400 hover:text-error'
              }`} 
            />
          </button>
        </div>
        
        <Link to={`/property/${property.id}`}>
          <h4 className="font-display font-semibold text-lg text-primary mb-2 hover:text-accent transition-colors duration-200 line-clamp-2">
            {property.title}
          </h4>
          
          <p className="text-gray-600 mb-4 flex items-center gap-1">
            <ApperIcon name="MapPin" size={16} />
            {property.address}, {property.city}, {property.state}
          </p>
        </Link>
        
        <div className="flex justify-between items-center text-sm text-gray-600">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <ApperIcon name="Bed" size={16} />
              {property.bedrooms} bed
            </span>
            <span className="flex items-center gap-1">
              <ApperIcon name="Bath" size={16} />
              {property.bathrooms} bath
            </span>
            <span className="flex items-center gap-1">
              <ApperIcon name="Square" size={16} />
              {property.squareFeet?.toLocaleString()} sqft
            </span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Listed {formatDate(property.listingDate)}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default PropertyCard