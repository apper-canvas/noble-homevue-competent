import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import FavoritesDrawer from "@/components/molecules/FavoritesDrawer";
import { savedPropertyService } from "@/services/api/savedPropertyService";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    loadFavoritesCount();
  }, []);

  const loadFavoritesCount = async () => {
    try {
      const savedProperties = await savedPropertyService.getAll()
      setFavoritesCount(savedProperties.length)
    } catch (err) {
      console.error('Failed to load favorites count:', err)
    }
  }

  const navItems = [
    { name: 'Browse', path: '/', icon: 'Search' },
    { name: 'Map View', path: '/map', icon: 'Map' },
    { name: 'Saved', path: '/saved', icon: 'Heart' },
    { name: 'Calculator', path: '/calculator', icon: 'Calculator' },
  ]

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  const handleFavoritesClick = () => {
    setIsFavoritesDrawerOpen(true)
    loadFavoritesCount() // Refresh count when opening drawer
  }
return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="Home" size={20} className="text-white" />
              </div>
              <span className="text-xl font-display font-bold text-primary">
                HomeVue
              </span>
            </Link>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <SearchBar />
            </div>

            {/* Navigation & Actions - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <nav className="flex items-center space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-button transition-all duration-300 ${
                      isActive(item.path)
                        ? 'bg-accent text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <ApperIcon name={item.icon} size={18} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </nav>

              {/* Favorites Button */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="small"
                  icon="Heart"
                  onClick={handleFavoritesClick}
                  className="relative"
                >
                  Favorites
                  {favoritesCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {favoritesCount > 99 ? '99+' : favoritesCount}
                    </span>
                  )}
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile Favorites Button */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="small"
                  icon="Heart"
                  onClick={handleFavoritesClick}
                  className="relative"
                />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                    {favoritesCount > 9 ? '9+' : favoritesCount}
                  </span>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="small"
                icon="Menu"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <SearchBar />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-button transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-accent text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ApperIcon name={item.icon} size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </header>

      {/* Favorites Drawer */}
      <FavoritesDrawer 
        isOpen={isFavoritesDrawerOpen} 
        onClose={() => setIsFavoritesDrawerOpen(false)} 
      />
    </>
);
};

export default Header;