import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'

const ContactUs = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast.success('Your message has been sent! We\'ll get back to you soon.')
    setContactForm({ name: '', email: '', phone: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

  const handleInputChange = (field, value) => {
    setContactForm(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-primary mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Have a question or need assistance? We're here to help you find your perfect home.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-card shadow-card">
              <h2 className="text-2xl font-display font-semibold text-primary mb-6">
                Get in Touch
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-card flex items-center justify-center flex-shrink-0">
                    <ApperIcon name="Phone" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Phone</h3>
                    <p className="text-gray-600">(555) 123-4567</p>
                    <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-card flex items-center justify-center flex-shrink-0">
                    <ApperIcon name="Mail" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Email</h3>
                    <p className="text-gray-600">info@homevue.com</p>
                    <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-card flex items-center justify-center flex-shrink-0">
                    <ApperIcon name="MapPin" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Office</h3>
                    <p className="text-gray-600">123 Real Estate Ave</p>
                    <p className="text-gray-600">Suite 456</p>
                    <p className="text-gray-600">New York, NY 10001</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-card flex items-center justify-center flex-shrink-0">
                    <ApperIcon name="Clock" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-card shadow-card">
              <h2 className="text-2xl font-display font-semibold text-primary mb-6">
                Send us a Message
              </h2>
              
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                  
                  <Input
                    label="Subject"
                    value={contactForm.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-primary">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-button focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300 bg-white resize-none"
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  loading={isSubmitting}
                  className="w-full md:w-auto"
                  icon="Send"
                  size="large"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Additional Information */}
        <div className="mt-12 bg-gradient-to-r from-accent/5 to-secondary/5 p-8 rounded-card">
          <div className="text-center">
            <ApperIcon name="MessageCircle" size={48} className="text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-display font-semibold text-primary mb-4">
              We're Here to Help
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Whether you're buying your first home, looking to sell, or need expert advice on the real estate market, 
              our experienced team is ready to assist you every step of the way. Don't hesitate to reach out!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs