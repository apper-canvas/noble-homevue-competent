import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'
import BrowseProperties from '@/components/pages/BrowseProperties'
import PropertyDetail from '@/components/pages/PropertyDetail'
import MapView from '@/components/pages/MapView'
import SavedProperties from '@/components/pages/SavedProperties'
import MortgageCalculator from '@/components/pages/MortgageCalculator'
import ContactUs from '@/components/pages/ContactUs'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<BrowseProperties />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/map" element={<MapView />} />
<Route path="/saved" element={<SavedProperties />} />
            <Route path="/calculator" element={<MortgageCalculator />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  )
}

export default App