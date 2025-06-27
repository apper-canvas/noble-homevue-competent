import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import PropertyCard from '@/components/molecules/PropertyCard'
import FilterPanel from '@/components/molecules/FilterPanel'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import { propertyService } from '@/services/api/propertyService'
import { savedPropertyService } from '@/services/api/savedPropertyService'

const BrowseProperties = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [savedProperties, setSavedProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(true)
  const [sortBy, setSortBy] = useState('newest')
  
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    propertyType: '',
    bedroomsMin: '',
    bathroomsMin: '',
    squareFeetMin: '',
    location: '',
  })
  
  useEffect(() => {
    loadProperties()
    loadSavedProperties()
  }, [])
  
  useEffect(() => {
    const searchQuery = searchParams.get('search')
    if (searchQuery) {
      setFilters(prev => ({ ...prev, location: searchQuery }))
    }
  }, [searchParams])
  
  useEffect(() => {
    applyFilters()
  }, [properties, filters, sortBy])
  
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
  
  const loadSavedProperties = async () => {
    try {
      const data = await savedPropertyService.getAll()
      setSavedProperties(data)
    } catch (err) {
      console.error('Failed to load saved properties:', err)
    }
  }
  
  const applyFilters = () => {
    let filtered = [...properties]
    
    // Apply filters
    if (filters.priceMin) {
      filtered = filtered.filter(p => p.price >= parseInt(filters.priceMin))
    }
    if (filters.priceMax) {
      filtered = filtered.filter(p => p.price <= parseInt(filters.priceMax))
    }
    if (filters.propertyType) {
      filtered = filtered.filter(p => p.propertyType === filters.propertyType)
    }
    if (filters.bedroomsMin) {
      filtered = filtered.filter(p => p.bedrooms >= parseInt(filters.bedroomsMin))
    }
    if (filters.bathroomsMin) {
      filtered = filtered.filter(p => p.bathrooms >= parseInt(filters.bathroomsMin))
    }
    if (filters.squareFeetMin) {
      filtered = filtered.filter(p => p.squareFeet >= parseInt(filters.squareFeetMin))
    }
    if (filters.location) {
      const searchTerm = filters.location.toLowerCase()
      filtered = filtered.filter(p => 
        p.address.toLowerCase().includes(searchTerm) ||
        p.city.toLowerCase().includes(searchTerm) ||
        p.state.toLowerCase().includes(searchTerm) ||
        p.zipCode.includes(searchTerm) ||
        p.title.toLowerCase().includes(searchTerm)
      )
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.listingDate) - new Date(a.listingDate))
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.listingDate) - new Date(b.listingDate))
        break
      default:
        break
    }
    
    setFilteredProperties(filtered)
  }
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }
  
  const handleClearFilters = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      propertyType: '',
      bedroomsMin: '',
      bathroomsMin: '',
      squareFeetMin: '',
      location: '',
    })
    setSearchParams({})
  }
  
  const handleToggleFavorite = async (propertyId) => {
    try {
      const isCurrentlySaved = savedProperties.some(sp => sp.propertyId === propertyId)
      
      if (isCurrentlySaved) {
        const savedProperty = savedProperties.find(sp => sp.propertyId === propertyId)
        await savedPropertyService.delete(savedProperty.id)
        setSavedProperties(prev => prev.filter(sp => sp.propertyId !== propertyId))
        toast.success('Property removed from favorites')
      } else {
        const newSavedProperty = {
          propertyId,
          savedDate: new Date().toISOString(),
          notes: ''
        }
        const saved = await savedPropertyService.create(newSavedProperty)
        setSavedProperties(prev => [...prev, saved])
        toast.success('Property added to favorites')
      }
    } catch (err) {
      toast.error('Failed to update favorites')
    }
  }
  
  const isFavorite = (propertyId) => {
    return savedProperties.some(sp => sp.propertyId === propertyId)
  }
  
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ]
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-card shadow-card p-6 animate-pulse">
              <div className="h-6 bg-gray-300 rounded mb-4 shimmer"></div>
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-300 rounded shimmer"></div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <Loading />
          </div>
        </div>
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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Sidebar */}
        <div className="lg:col-span-1">
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            isCollapsed={isFilterCollapsed}
            onToggleCollapse={() => setIsFilterCollapsed(!isFilterCollapsed)}
          />
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-primary mb-2">
                Browse Properties
              </h1>
              <p className="text-gray-600">
                {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-button focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300 bg-white"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              {/* View Toggle */}
              <div className="flex rounded-button border-2 border-gray-200 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors duration-200 ${
                    viewMode === 'grid' ? 'bg-accent text-white' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <ApperIcon name="Grid3X3" size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors duration-200 ${
                    viewMode === 'list' ? 'bg-accent text-white' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <ApperIcon name="List" size={20} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Properties Grid/List */}
          {filteredProperties.length === 0 ? (
            <Empty
              title="No properties found"
              description="Try adjusting your search criteria or browse all available properties."
              actionText="Clear Filters"
              onAction={handleClearFilters}
            />
          ) : (
            <motion.div
              layout
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-6'
              }
            >
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={isFavorite(property.id)}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BrowseProperties