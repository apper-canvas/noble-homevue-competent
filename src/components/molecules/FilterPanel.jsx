import React from 'react'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const FilterPanel = ({ filters, onFilterChange, onClearFilters, isCollapsed, onToggleCollapse }) => {
  const propertyTypeOptions = [
    { value: 'house', label: 'House' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'apartment', label: 'Apartment' },
  ]
  
  const bedroomOptions = [
    { value: '1', label: '1+ Bedrooms' },
    { value: '2', label: '2+ Bedrooms' },
    { value: '3', label: '3+ Bedrooms' },
    { value: '4', label: '4+ Bedrooms' },
    { value: '5', label: '5+ Bedrooms' },
  ]
  
  const bathroomOptions = [
    { value: '1', label: '1+ Bathrooms' },
    { value: '2', label: '2+ Bathrooms' },
    { value: '3', label: '3+ Bathrooms' },
    { value: '4', label: '4+ Bathrooms' },
  ]
  
  return (
    <div className="bg-white rounded-card shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-semibold text-xl text-primary">Filters</h3>
        <button
          onClick={onToggleCollapse}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <ApperIcon name={isCollapsed ? "ChevronDown" : "ChevronUp"} size={20} />
        </button>
      </div>
      
      <div className={`space-y-6 ${isCollapsed ? 'hidden lg:block' : ''}`}>
        <div>
          <h4 className="font-medium text-primary mb-3">Price Range</h4>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="Min Price"
              value={filters.priceMin || ''}
              onChange={(e) => onFilterChange('priceMin', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max Price"
              value={filters.priceMax || ''}
              onChange={(e) => onFilterChange('priceMax', e.target.value)}
            />
          </div>
        </div>
        
        <Select
          label="Property Type"
          value={filters.propertyType || ''}
          onChange={(e) => onFilterChange('propertyType', e.target.value)}
          options={propertyTypeOptions}
          placeholder="All Types"
        />
        
        <Select
          label="Bedrooms"
          value={filters.bedroomsMin || ''}
          onChange={(e) => onFilterChange('bedroomsMin', e.target.value)}
          options={bedroomOptions}
          placeholder="Any"
        />
        
        <Select
          label="Bathrooms"
          value={filters.bathroomsMin || ''}
          onChange={(e) => onFilterChange('bathroomsMin', e.target.value)}
          options={bathroomOptions}
          placeholder="Any"
        />
        
        <Input
          label="Minimum Square Feet"
          type="number"
          placeholder="e.g., 1000"
          value={filters.squareFeetMin || ''}
          onChange={(e) => onFilterChange('squareFeetMin', e.target.value)}
        />
        
        <Input
          label="Location"
          placeholder="City, State, or ZIP"
          value={filters.location || ''}
          onChange={(e) => onFilterChange('location', e.target.value)}
        />
        
        <Button
          variant="outline"
          icon="X"
          onClick={onClearFilters}
          className="w-full"
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  )
}

export default FilterPanel