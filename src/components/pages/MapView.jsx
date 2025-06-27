import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { propertyService } from '@/services/api/propertyService'
import { formatPrice } from '@/utils/formatters'

const MapView = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedProperty, setSelectedProperty] = useState(null)
  
  useEffect(() => {
    loadProperties()
  }, [])
  
  const loadProperties = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await propertyService.getAll()
      setProperties(data)
    } catch (err) {
      setError('Failed to load properties. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
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
        <Error message={error} onRetry={loadProperties} />
      </div>
    )
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-primary mb-2">
          Map View
        </h1>
        <p className="text-gray-600">
          Explore properties on an interactive map
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Placeholder */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-card shadow-card p-8 min-h-[600px] flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-premium">
                <ApperIcon name="Map" size={48} className="text-white" />
              </div>
              <h3 className="text-2xl font-display font-semibold text-primary mb-4 gradient-text">
                Interactive Map Coming Soon
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We're working on an amazing interactive map experience to help you find properties by location. 
                In the meantime, browse our property listings.
              </p>
              <Button
                icon="ArrowLeft"
                onClick={() => window.history.back()}
              >
                Back to Browse
              </Button>
            </div>
          </div>
        </div>
        
        {/* Property List */}
        <div className="space-y-4">
          <h2 className="text-xl font-display font-semibold text-primary">
            Available Properties ({properties.length})
          </h2>
          
          {properties.slice(0, 10).map((property) => (
            <div
              key={property.id}
              className={`bg-white rounded-card shadow-card p-4 cursor-pointer transition-all duration-300 hover:shadow-card-hover ${
                selectedProperty?.id === property.id ? 'ring-2 ring-accent' : ''
              }`}
              onClick={() => setSelectedProperty(property)}
            >
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0">
                  {property.images?.[0] ? (
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <ApperIcon name="Home" size={24} className="text-gray-400" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-primary truncate">
                    {property.title}
                  </h3>
                  <p className="price-text text-lg font-bold">
                    {formatPrice(property.price)}
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    {property.address}, {property.city}
                  </p>
                  <div className="flex gap-3 text-xs text-gray-500 mt-1">
                    <span>{property.bedrooms} bed</span>
                    <span>{property.bathrooms} bath</span>
                    <span>{property.squareFeet?.toLocaleString()} sqft</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {properties.length > 10 && (
            <div className="text-center pt-4">
              <Button variant="outline" icon="Plus">
                View All Properties
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MapView