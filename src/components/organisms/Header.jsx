import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import SearchBar from '@/components/molecules/SearchBar'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  
  const navigation = [
    { name: 'Browse Properties', href: '/', icon: 'Home' },
    { name: 'Map View', href: '/map', icon: 'Map' },
    { name: 'Saved Properties', href: '/saved', icon: 'Heart' },
    { name: 'Mortgage Calculator', href: '/calculator', icon: 'Calculator' },
  ]
  
  const handleSearch = (query) => {
    navigate(`/?search=${encodeURIComponent(query)}`)
  }
  
  const isActive = (path) => {
    return location.pathname === path
  }
  
  return (
    <header className="bg-white glass-effect sticky top-0 z-40 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center shadow-card group-hover:shadow-card-hover transition-all duration-300">
              <ApperIcon name="Home" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold gradient-text">HomeVue</h1>
              <p className="text-xs text-gray-500 -mt-1">Premium Real Estate</p>
            </div>
          </Link>
          
          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-button text-sm font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? 'bg-gradient-secondary text-white shadow-card'
                    : 'text-gray-700 hover:text-accent hover:bg-gray-50'
                }`}
              >
                <ApperIcon name={item.icon} size={18} />
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-button text-gray-700 hover:text-accent hover:bg-gray-50 transition-colors duration-200"
          >
            <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-button text-base font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'bg-gradient-secondary text-white shadow-card'
                      : 'text-gray-700 hover:text-accent hover:bg-gray-50'
                  }`}
                >
                  <ApperIcon name={item.icon} size={20} />
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header