import React, { useState, useEffect } from 'react'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import { neighborhoodService } from '@/services/api/neighborhoodService'

const NeighborhoodStats = ({ propertyId }) => {
  const [neighborhood, setNeighborhood] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadNeighborhoodData()
  }, [propertyId])

  const loadNeighborhoodData = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await neighborhoodService.getByPropertyId(propertyId)
      setNeighborhood(data)
    } catch (err) {
      setError('Failed to load neighborhood information')
    } finally {
      setLoading(false)
    }
  }

  const getTypeIcon = (type) => {
    const iconMap = {
      'Elementary School': 'GraduationCap',
      'Middle School': 'GraduationCap', 
      'High School': 'GraduationCap',
      'Subway': 'Train',
      'Light Rail': 'Train',
      'Train': 'Train',
      'Bus Station': 'Bus',
      'Shuttle': 'Bus',
      'Trolley': 'Train',
      'Metro Rail': 'Train',
      'Airport': 'Plane',
      'Shopping': 'ShoppingBag',
      'Recreation': 'Trees',
      'Healthcare': 'Heart',
      'Dining': 'Coffee',
      'Fitness': 'Dumbbell',
      'Wellness': 'Flower',
      'Culture': 'Palette'
    }
    return iconMap[type] || 'MapPin'
  }

  const renderStarRating = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <ApperIcon
            key={i}
            name="Star"
            size={14}
            className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
          />
        ))}
        <span className="text-sm font-medium text-gray-700 ml-1">{rating}</span>
      </div>
    )
  }

  const renderCategory = (title, items, icon) => {
    if (!items || items.length === 0) return null

    return (
      <div className="bg-white p-6 rounded-card shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-accent/10 rounded-lg">
            <ApperIcon name={icon} size={24} className="text-accent" />
          </div>
          <h3 className="text-xl font-display font-semibold text-primary">{title}</h3>
        </div>
        
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-3 flex-1">
                <div className="p-1.5 bg-white rounded-md shadow-sm">
                  <ApperIcon 
                    name={getTypeIcon(item.type)} 
                    size={16} 
                    className="text-accent" 
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-primary">{item.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{item.type}</p>
                  {renderStarRating(item.rating)}
                </div>
              </div>
              <div className="text-right ml-4">
                <div className="flex items-center gap-1 text-gray-600">
                  <ApperIcon name="MapPin" size={14} />
                  <span className="text-sm font-medium">{item.distance} mi</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-card shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <Loading />
      </div>
    )
  }

  if (error || !neighborhood) {
    return (
      <div className="bg-white p-6 rounded-card shadow-card">
        <Error message={error || 'No neighborhood data available'} onRetry={loadNeighborhoodData} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-primary mb-2">
          Neighborhood Insights
        </h2>
        <p className="text-gray-600">
          Discover what makes this location special
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {renderCategory('Schools', neighborhood.schools, 'GraduationCap')}
        {renderCategory('Transit', neighborhood.transit, 'Train')}
        {renderCategory('Amenities', neighborhood.amenities, 'MapPin')}
      </div>
    </div>
  )
}

export default NeighborhoodStats