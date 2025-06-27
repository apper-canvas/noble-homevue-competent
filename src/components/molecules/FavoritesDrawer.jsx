import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { savedPropertyService } from '@/services/api/savedPropertyService'
import { propertyService } from '@/services/api/propertyService'
import { formatPrice } from '@/utils/formatters'

const FavoritesDrawer = ({ isOpen, onClose }) => {
  const [savedProperties, setSavedProperties] = useState([])
  const [savedPropertiesWithDetails, setSavedPropertiesWithDetails] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      loadSavedProperties()
    }
  }, [isOpen])

  const loadSavedProperties = async () => {
    try {
      setLoading(true)
      setError('')
      
      const savedData = await savedPropertyService.getAll()
      setSavedProperties(savedData)
      
      // Get property details for each saved property
      const propertiesWithDetails = await Promise.all(
        savedData.map(async (saved) => {
          try {
            const property = await propertyService.getById(saved.propertyId)
            return property ? { ...saved, property } : null
          } catch (err) {
            console.error(`Failed to load property ${saved.propertyId}:`, err)
            return null
          }
        })
      )
      
      setSavedPropertiesWithDetails(propertiesWithDetails.filter(Boolean))
    } catch (err) {
      setError('Failed to load saved properties')
      console.error('Error loading saved properties:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFromFavorites = async (propertyId) => {
    try {
      const savedProperty = savedProperties.find(sp => sp.propertyId === propertyId)
      if (!savedProperty) return

      await savedPropertyService.delete(savedProperty.Id)
      
      setSavedProperties(prev => prev.filter(sp => sp.propertyId !== propertyId))
      setSavedPropertiesWithDetails(prev => prev.filter(sp => sp.propertyId !== propertyId))
      
      toast.success('Property removed from favorites')
    } catch (err) {
      toast.error('Failed to remove property from favorites')
      console.error('Error removing from favorites:', err)
    }
  }

  const handleViewDetails = (propertyId) => {
    onClose()
    // Navigation will be handled by the Link component
  }

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-display font-semibold text-primary">
                Favorites ({savedPropertiesWithDetails.length})
              </h2>
              <Button
                variant="ghost"
                size="small"
                icon="X"
                onClick={onClose}
                className="hover:bg-gray-100"
              />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="p-6">
                  <Loading />
                </div>
              ) : error ? (
                <div className="p-6">
                  <Error message={error} onRetry={loadSavedProperties} />
                </div>
              ) : savedPropertiesWithDetails.length === 0 ? (
                <div className="p-6">
                  <Empty
                    title="No favorites yet"
                    description="Start browsing properties and save your favorites to see them here."
                    actionText="Browse Properties"
                    onAction={() => {
                      onClose()
                      window.location.href = '/'
                    }}
                  />
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  {savedPropertiesWithDetails.map((saved) => (
                    <motion.div
                      key={saved.Id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white rounded-card shadow-card border border-gray-200 overflow-hidden"
                    >
                      {/* Property Image */}
                      <div className="relative h-32">
                        <img
                          src={saved.property.images?.[0] || '/placeholder-property.jpg'}
                          alt={saved.property.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/placeholder-property.jpg'
                          }}
                        />
                        <div className="absolute top-2 right-2">
                          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                            {saved.property.propertyType}
                          </span>
                        </div>
                      </div>

                      {/* Property Details */}
                      <div className="p-4">
                        <h3 className="font-semibold text-primary mb-1 line-clamp-1">
                          {saved.property.title}
                        </h3>
                        <p className="text-lg price-text mb-2">
                          {formatPrice(saved.property.price)}
                        </p>
                        <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                          <ApperIcon name="MapPin" size={14} />
                          <span className="line-clamp-1">
                            {saved.property.city}, {saved.property.state}
                          </span>
                        </p>

                        {/* Property Features */}
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-1">
                            <ApperIcon name="Bed" size={14} />
                            <span>{saved.property.bedrooms}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ApperIcon name="Bath" size={14} />
                            <span>{saved.property.bathrooms}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ApperIcon name="Square" size={14} />
                            <span>{saved.property.squareFeet?.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Link
                            to={`/property/${saved.property.id}`}
                            onClick={() => handleViewDetails(saved.property.id)}
                            className="flex-1"
                          >
                            <Button
                              variant="outline"
                              size="small"
                              icon="Eye"
                              className="w-full"
                            >
                              View Details
                            </Button>
                          </Link>
                          <Button
                            variant="danger"
                            size="small"
                            icon="Trash2"
                            onClick={() => handleRemoveFromFavorites(saved.property.id)}
                            className="hover:bg-red-600"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default FavoritesDrawer