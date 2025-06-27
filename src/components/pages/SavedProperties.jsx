import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import PropertyCard from '@/components/molecules/PropertyCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { savedPropertyService } from '@/services/api/savedPropertyService'
import { propertyService } from '@/services/api/propertyService'

const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState([])
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  useEffect(() => {
    loadSavedProperties()
  }, [])
  
  const loadSavedProperties = async () => {
    try {
      setLoading(true)
      setError('')
      const [savedData, propertiesData] = await Promise.all([
        savedPropertyService.getAll(),
        propertyService.getAll()
      ])
      setSavedProperties(savedData)
      setProperties(propertiesData)
    } catch (err) {
      setError('Failed to load saved properties. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const handleRemoveFromFavorites = async (propertyId) => {
    try {
      const savedProperty = savedProperties.find(sp => sp.propertyId === propertyId)
      if (savedProperty) {
        await savedPropertyService.delete(savedProperty.id)
        setSavedProperties(prev => prev.filter(sp => sp.propertyId !== propertyId))
        toast.success('Property removed from favorites')
      }
    } catch (err) {
      toast.error('Failed to remove property from favorites')
    }
  }
  
  // Get the full property details for saved properties
  const savedPropertiesWithDetails = savedProperties
    .map(saved => {
      const property = properties.find(p => p.id === saved.propertyId)
      return property ? { ...property, savedDate: saved.savedDate, notes: saved.notes } : null
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.savedDate) - new Date(a.savedDate))
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loading />
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error message={error} onRetry={loadSavedProperties} />
      </div>
    )
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-primary mb-2">
          Saved Properties
        </h1>
        <p className="text-gray-600">
          {savedPropertiesWithDetails.length} {savedPropertiesWithDetails.length === 1 ? 'property' : 'properties'} saved
        </p>
      </div>
      
      {savedPropertiesWithDetails.length === 0 ? (
        <Empty
          title="No saved properties yet"
          description="Start exploring properties and save your favorites to view them here. Click the heart icon on any property to add it to your saved list."
          actionText="Browse Properties"
          onAction={() => window.location.href = '/'}
          icon="Heart"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedPropertiesWithDetails.map((property) => (
            <div key={property.id} className="relative">
              <PropertyCard
                property={property}
                onToggleFavorite={handleRemoveFromFavorites}
                isFavorite={true}
              />
              
              {/* Saved Date Badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-success to-emerald-400 text-white px-3 py-1 rounded-full text-sm font-medium shadow-card">
                <ApperIcon name="Heart" size={14} className="inline mr-1" />
                Saved
              </div>
            </div>
          ))}
        </div>
      )}
      
      {savedPropertiesWithDetails.length > 0 && (
        <div className="mt-12 text-center">
          <div className="bg-white rounded-card shadow-card p-8">
            <h2 className="text-2xl font-display font-semibold text-primary mb-4">
              Keep Exploring
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              You've saved some great properties! Continue browsing to discover more amazing homes that might be perfect for you.
            </p>
            <Button
              icon="Search"
              onClick={() => window.location.href = '/'}
            >
              Browse More Properties
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SavedProperties