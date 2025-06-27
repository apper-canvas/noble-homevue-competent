import React, { useState } from 'react'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const SearchBar = ({ onSearch, placeholder = "Search by location, address, or keywords..." }) => {
  const [query, setQuery] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="flex-1 relative">
        <ApperIcon 
          name="Search" 
          size={20} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-button focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300 bg-white"
        />
      </div>
      <Button type="submit" icon="Search" className="px-6">
        Search
      </Button>
    </form>
  )
}

export default SearchBar