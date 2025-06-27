import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const ImageGallery = ({ images = [], title = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  if (!images.length) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
        <ApperIcon name="Home" size={80} className="text-gray-400" />
      </div>
    )
  }
  
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }
  
  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }
  
  return (
    <>
      <div className="space-y-4">
        <div className="relative h-96 rounded-lg overflow-hidden group">
          <img
            src={images[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
              >
                <ApperIcon name="ChevronLeft" size={20} />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
              >
                <ApperIcon name="ChevronRight" size={20} />
              </button>
            </>
          )}
          
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
          >
            <ApperIcon name="Expand" size={20} />
          </button>
          
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-20 h-16 rounded border-2 overflow-hidden transition-all duration-200 ${
                  index === currentIndex ? 'border-accent' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
      
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            <div className="relative max-w-6xl max-h-[90vh] mx-4">
              <img
                src={images[currentIndex]}
                alt={`${title} - Fullscreen`}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200"
              >
                <ApperIcon name="X" size={24} />
              </button>
              
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-200"
                  >
                    <ApperIcon name="ChevronLeft" size={24} />
                  </button>
                  
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-200"
                  >
                    <ApperIcon name="ChevronRight" size={24} />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ImageGallery