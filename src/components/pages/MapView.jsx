import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { toast } from 'react-toastify'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { propertyService } from '@/services/api/propertyService'
import { formatPrice } from '@/utils/formatters'

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const MapView = () => {
  const navigate = useNavigate()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [mapCenter, setMapCenter] = useState([39.8283, -98.5795]) // Center of USA
  const [mapZoom, setMapZoom] = useState(4)
  
  useEffect(() => {
    loadProperties()
  }, [])
  
  const loadProperties = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await propertyService.getAll()
      setProperties(data)
      
      // If properties exist, center map on first property
      if (data.length > 0 && data[0].latitude && data[0].longitude) {
        setMapCenter([data[0].latitude, data[0].longitude])
        setMapZoom(6)
      }
    } catch (err) {
      setError('Failed to load properties. Please try again.')
      toast.error('Failed to load properties')
    } finally {
      setLoading(false)
    }
  }

  const createCustomIcon = (property) => {
    const propertyTypeIcons = {
      house: 'Home',
      condo: 'Building2',
      apartment: 'Building',
      townhouse: 'Home'
    }
    
    const iconName = propertyTypeIcons[property.propertyType] || 'Home'
    
    return L.divIcon({
      html: `
        <div class="flex flex-col items-center">
          <div class="bg-accent text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg mb-1 whitespace-nowrap">
            ${formatPrice(property.price)}
          </div>
          <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              ${iconName === 'Home' ? '<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>' : '<path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>'}
            </svg>
          </div>
        </div>
      `,
      className: 'custom-marker',
      iconSize: [60, 60],
      iconAnchor: [30, 60]
    })
  }

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`)
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
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold text-primary mb-2">
          Interactive Property Map
        </h1>
        <p className="text-gray-600">
          Explore properties on the map. Click markers to view details or navigate to property pages.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Interactive Map */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-card shadow-card overflow-hidden">
            <div className="h-[600px] relative">
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                className="h-full w-full z-0"
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                <MarkerClusterGroup
                  chunkedLoading
                  maxClusterRadius={50}
                  spiderfyOnMaxZoom={true}
                  showCoverageOnHover={false}
                >
                  {properties
                    .filter(property => property.latitude && property.longitude)
                    .map((property) => (
                      <Marker
                        key={property.id}
                        position={[property.latitude, property.longitude]}
                        icon={createCustomIcon(property)}
                        eventHandlers={{
                          click: () => {
                            setSelectedProperty(property)
                          }
                        }}
                      >
                        <Popup>
                          <div className="p-2 min-w-[250px]">
                            <div className="flex gap-3 mb-3">
                              <div className="w-16 h-16 rounded bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0">
                                {property.images?.[0] ? (
                                  <img
                                    src={property.images[0]}
                                    alt={property.title}
                                    className="w-full h-full object-cover rounded"
                                  />
                                ) : (
                                  <ApperIcon name="Home" size={20} className="text-gray-400" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-primary text-sm leading-tight mb-1">
                                  {property.title}
                                </h3>
                                <p className="price-text text-base font-bold text-accent">
                                  {formatPrice(property.price)}
                                </p>
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-2">
                              {property.address}
                            </p>
                            <p className="text-sm text-gray-600 mb-3">
                              {property.city}, {property.state} {property.zipCode}
                            </p>
                            
                            <div className="flex gap-3 text-xs text-gray-500 mb-3">
                              <span>{property.bedrooms} bed</span>
                              <span>{property.bathrooms} bath</span>
                              <span>{property.squareFeet?.toLocaleString()} sqft</span>
                            </div>
                            
                            <Button
                              size="sm"
                              onClick={() => handlePropertyClick(property.id)}
                              className="w-full"
                            >
                              View Details
                            </Button>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                </MarkerClusterGroup>
              </MapContainer>
            </div>
          </div>
        </div>
        
        {/* Property Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-card shadow-card p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display font-semibold text-primary">
                Properties ({properties.length})
              </h2>
              <ApperIcon name="MapPin" size={20} className="text-accent" />
            </div>
            
            {selectedProperty && (
              <div className="mb-4 p-3 bg-accent/5 rounded-lg border border-accent/20">
                <h3 className="text-sm font-semibold text-primary mb-1">Selected</h3>
                <p className="text-xs text-gray-600 truncate">{selectedProperty.title}</p>
                <p className="text-sm font-bold text-accent">{formatPrice(selectedProperty.price)}</p>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-card shadow-card p-4 max-h-[500px] overflow-y-auto">
            <div className="space-y-3">
              {properties.slice(0, 12).map((property) => (
                <div
                  key={property.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                    selectedProperty?.id === property.id 
                      ? 'bg-accent/5 border border-accent/30' 
                      : 'border border-gray-200'
                  }`}
                  onClick={() => {
                    setSelectedProperty(property)
                    if (property.latitude && property.longitude) {
                      setMapCenter([property.latitude, property.longitude])
                      setMapZoom(12)
                    }
                  }}
                >
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0">
                      {property.images?.[0] ? (
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <ApperIcon name="Home" size={16} className="text-gray-400" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-primary text-sm truncate">
                        {property.title}
                      </h3>
                      <p className="price-text text-sm font-bold text-accent">
                        {formatPrice(property.price)}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {property.city}, {property.state}
                      </p>
                      <div className="flex gap-2 text-xs text-gray-500 mt-1">
                        <span>{property.bedrooms}bd</span>
                        <span>{property.bathrooms}ba</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapView