import React from 'react'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = {
    'Browse': [
      { name: 'All Properties', href: '/' },
      { name: 'Map View', href: '/map' },
      { name: 'Saved Properties', href: '/saved' },
    ],
    'Tools': [
      { name: 'Mortgage Calculator', href: '/calculator' },
      { name: 'Market Trends', href: '#' },
      { name: 'Neighborhood Guide', href: '#' },
    ],
    'Support': [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'FAQ', href: '#' },
    ],
  }
  
  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', href: '#' },
    { name: 'Twitter', icon: 'Twitter', href: '#' },
    { name: 'Instagram', icon: 'Instagram', href: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', href: '#' },
  ]
  
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center shadow-card">
                <ApperIcon name="Home" size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold">HomeVue</h2>
                <p className="text-sm text-gray-300 -mt-1">Premium Real Estate</p>
              </div>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Discover your dream home with HomeVue's sophisticated real estate marketplace. 
              We make finding the perfect property effortless and enjoyable.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors duration-300"
                  aria-label={social.name}
                >
                  <ApperIcon name={social.icon} size={20} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-display font-semibold text-lg mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-secondary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-300 text-sm">
            © {currentYear} HomeVue. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-300 hover:text-secondary transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-300 hover:text-secondary transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-gray-300 hover:text-secondary transition-colors duration-200">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer