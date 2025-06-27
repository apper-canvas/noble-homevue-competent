import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ImageGallery from '@/components/molecules/ImageGallery'
import NeighborhoodStats from '@/components/molecules/NeighborhoodStats'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'
import { propertyService } from '@/services/api/propertyService'
import { savedPropertyService } from '@/services/api/savedPropertyService'
import { formatPrice, formatDate } from '@/utils/formatters'

const PropertyDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [savedProperties, setSavedProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  useEffect(() => {
    loadProperty()
    loadSavedProperties()
  }, [id])
  
  const loadProperty = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await propertyService.getById(id)
      if (data) {
        setProperty(data)
      } else {
        setError('Property not found')
      }
    } catch (err) {
      setError('Failed to load property details. Please try again.')
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
  
  const handleToggleFavorite = async () => {
    try {
      const isCurrentlySaved = savedProperties.some(sp => sp.propertyId === id)
      
      if (isCurrentlySaved) {
        const savedProperty = savedProperties.find(sp => sp.propertyId === id)
        await savedPropertyService.delete(savedProperty.id)
        setSavedProperties(prev => prev.filter(sp => sp.propertyId !== id))
        toast.success('Property removed from favorites')
      } else {
        const newSavedProperty = {
          propertyId: id,
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
  
  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast.success('Your message has been sent! We\'ll get back to you soon.')
    setContactForm({ name: '', email: '', phone: '', message: '' })
    setIsSubmitting(false)
  }
  
  const handleInputChange = (field, value) => {
    setContactForm(prev => ({ ...prev, [field]: value }))
  }
  
  const isFavorite = savedProperties.some(sp => sp.propertyId === id)
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loading type="detail" />
      </div>
    )
  }
  
  if (error || !property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error message={error} onRetry={loadProperty} />
      </div>
    )
  }
  
  const propertyFeatures = [
    { icon: 'Bed', label: 'Bedrooms', value: property.bedrooms },
    { icon: 'Bath', label: 'Bathrooms', value: property.bathrooms },
    { icon: 'Square', label: 'Square Feet', value: property.squareFeet?.toLocaleString() },
    { icon: 'Calendar', label: 'Year Built', value: property.yearBuilt },
  ]
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        icon="ArrowLeft"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        Back to Properties
      </Button>
      
      {/* Image Gallery */}
      <div className="mb-8">
        <ImageGallery images={property.images} title={property.title} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Property Details */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-display font-bold text-primary mb-2">
                {property.title}
              </h1>
              <p className="text-3xl price-text mb-2">
                {formatPrice(property.price)}
              </p>
              <p className="text-gray-600 flex items-center gap-2">
                <ApperIcon name="MapPin" size={18} />
                {property.address}, {property.city}, {property.state} {property.zipCode}
              </p>
            </div>
            
            <Button
              variant={isFavorite ? "danger" : "outline"}
              icon="Heart"
              onClick={handleToggleFavorite}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
          </div>
          
          {/* Property Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {propertyFeatures.map((feature) => (
              <div key={feature.label} className="bg-white p-4 rounded-card shadow-card text-center">
                <ApperIcon name={feature.icon} size={24} className="text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold text-primary">{feature.value}</p>
                <p className="text-sm text-gray-600">{feature.label}</p>
              </div>
            ))}
</div>
          
          {/* Neighborhood Stats */}
          <div className="mb-8">
            <NeighborhoodStats propertyId={id} />
          </div>
          
          {/* Property Description */}
          <div className="bg-white p-6 rounded-card shadow-card mb-8">
            <h2 className="text-2xl font-display font-semibold text-primary mb-4">
              About This Property
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {property.description}
            </p>
            
            {property.features && property.features.length > 0 && (
              <>
                <h3 className="text-xl font-display font-semibold text-primary mb-4">
                  Features & Amenities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <ApperIcon name="Check" size={16} className="text-success" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          
          {/* Property Info */}
          <div className="bg-white p-6 rounded-card shadow-card">
            <h2 className="text-2xl font-display font-semibold text-primary mb-4">
              Property Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-gray-600">Property Type:</span>
                <span className="font-medium ml-2 capitalize">{property.propertyType}</span>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <span className="font-medium ml-2">{property.status}</span>
              </div>
              <div>
                <span className="text-gray-600">Listed:</span>
                <span className="font-medium ml-2">{formatDate(property.listingDate)}</span>
              </div>
              <div>
                <span className="text-gray-600">Property ID:</span>
                <span className="font-medium ml-2">{property.id}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-card shadow-card sticky top-24">
            <h3 className="text-xl font-display font-semibold text-primary mb-4">
              Contact Agent
            </h3>
            
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <Input
                label="Full Name"
                value={contactForm.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
              
              <Input
                label="Email Address"
                type="email"
                value={contactForm.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
              
              <Input
                label="Phone Number"
                type="tel"
                value={contactForm.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary">
                  Message
                </label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={4}
                  placeholder="I'm interested in this property..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-button focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300 bg-white resize-none"
                />
              </div>
              
              <Button
                type="submit"
                loading={isSubmitting}
                className="w-full"
                icon="Send"
              >
                Send Message
              </Button>
            </form>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <ApperIcon name="Phone" size={20} className="text-accent" />
                <span className="text-gray-700">(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <ApperIcon name="Mail" size={20} className="text-accent" />
                <span className="text-gray-700">agent@homevue.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail