import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { formatPrice } from '@/utils/formatters'

const MortgageCalculator = () => {
  const [inputs, setInputs] = useState({
    homePrice: '400000',
    downPayment: '80000',
    downPaymentPercent: '20',
    loanTerm: '30',
    interestRate: '6.5',
    propertyTax: '4800',
    homeInsurance: '1200',
    pmi: '200',
    hoaFees: '0'
  })
  
  const [results, setResults] = useState({
    monthlyPayment: 0,
    principalAndInterest: 0,
    propertyTax: 0,
    homeInsurance: 0,
    pmi: 0,
    hoaFees: 0,
    totalInterest: 0,
    totalPayments: 0
  })
  
  useEffect(() => {
    calculateMortgage()
  }, [inputs])
  
  const handleInputChange = (field, value) => {
    setInputs(prev => {
      const newInputs = { ...prev, [field]: value }
      
      // Auto-calculate down payment percentage/amount
      if (field === 'downPayment' && prev.homePrice) {
        const percent = (parseFloat(value) / parseFloat(prev.homePrice) * 100).toFixed(1)
        newInputs.downPaymentPercent = percent
      } else if (field === 'downPaymentPercent' && prev.homePrice) {
        const amount = (parseFloat(prev.homePrice) * parseFloat(value) / 100).toFixed(0)
        newInputs.downPayment = amount
      } else if (field === 'homePrice') {
        // Recalculate down payment amount when home price changes
        if (prev.downPaymentPercent) {
          const amount = (parseFloat(value) * parseFloat(prev.downPaymentPercent) / 100).toFixed(0)
          newInputs.downPayment = amount
        }
      }
      
      return newInputs
    })
  }
  
  const calculateMortgage = () => {
    const homePrice = parseFloat(inputs.homePrice) || 0
    const downPayment = parseFloat(inputs.downPayment) || 0
    const loanAmount = homePrice - downPayment
    const monthlyRate = (parseFloat(inputs.interestRate) / 100) / 12
    const numPayments = parseFloat(inputs.loanTerm) * 12
    
    let principalAndInterest = 0
    if (loanAmount > 0 && monthlyRate > 0 && numPayments > 0) {
      principalAndInterest = loanAmount * 
        (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
        (Math.pow(1 + monthlyRate, numPayments) - 1)
    }
    
    const monthlyPropertyTax = (parseFloat(inputs.propertyTax) || 0) / 12
    const monthlyHomeInsurance = (parseFloat(inputs.homeInsurance) || 0) / 12
    const monthlyPMI = parseFloat(inputs.pmi) || 0
    const monthlyHOA = parseFloat(inputs.hoaFees) || 0
    
    const monthlyPayment = principalAndInterest + monthlyPropertyTax + 
                          monthlyHomeInsurance + monthlyPMI + monthlyHOA
    
    const totalPayments = principalAndInterest * numPayments
    const totalInterest = totalPayments - loanAmount
    
    setResults({
      monthlyPayment,
      principalAndInterest,
      propertyTax: monthlyPropertyTax,
      homeInsurance: monthlyHomeInsurance,
      pmi: monthlyPMI,
      hoaFees: monthlyHOA,
      totalInterest,
      totalPayments
    })
  }
  
  const resetCalculator = () => {
    setInputs({
      homePrice: '400000',
      downPayment: '80000',
      downPaymentPercent: '20',
      loanTerm: '30',
      interestRate: '6.5',
      propertyTax: '4800',
      homeInsurance: '1200',
      pmi: '200',
      hoaFees: '0'
    })
  }
  
  const paymentBreakdown = [
    { label: 'Principal & Interest', amount: results.principalAndInterest, color: 'bg-accent' },
    { label: 'Property Tax', amount: results.propertyTax, color: 'bg-secondary' },
    { label: 'Home Insurance', amount: results.homeInsurance, color: 'bg-success' },
    { label: 'PMI', amount: results.pmi, color: 'bg-warning' },
    { label: 'HOA Fees', amount: results.hoaFees, color: 'bg-error' },
  ]
  
  const totalBreakdown = paymentBreakdown.reduce((sum, item) => sum + item.amount, 0)
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-primary mb-2">
          Mortgage Calculator
        </h1>
        <p className="text-gray-600">
          Calculate your monthly mortgage payments and see the breakdown
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-card shadow-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-display font-semibold text-primary">
              Loan Details
            </h2>
            <Button variant="outline" icon="RotateCcw" onClick={resetCalculator}>
              Reset
            </Button>
          </div>
          
          <div className="space-y-6">
            <Input
              label="Home Price"
              type="number"
              value={inputs.homePrice}
              onChange={(e) => handleInputChange('homePrice', e.target.value)}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Down Payment ($)"
                type="number"
                value={inputs.downPayment}
                onChange={(e) => handleInputChange('downPayment', e.target.value)}
              />
              <Input
                label="Down Payment (%)"
                type="number"
                value={inputs.downPaymentPercent}
                onChange={(e) => handleInputChange('downPaymentPercent', e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Loan Term (Years)"
                type="number"
                value={inputs.loanTerm}
                onChange={(e) => handleInputChange('loanTerm', e.target.value)}
              />
              <Input
                label="Interest Rate (%)"
                type="number"
                step="0.1"
                value={inputs.interestRate}
                onChange={(e) => handleInputChange('interestRate', e.target.value)}
              />
            </div>
            
            <h3 className="text-lg font-display font-semibold text-primary pt-4 border-t border-gray-200">
              Additional Costs (Annual)
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Property Tax"
                type="number"
                value={inputs.propertyTax}
                onChange={(e) => handleInputChange('propertyTax', e.target.value)}
              />
              <Input
                label="Home Insurance"
                type="number"
                value={inputs.homeInsurance}
                onChange={(e) => handleInputChange('homeInsurance', e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="PMI (Monthly)"
                type="number"
                value={inputs.pmi}
                onChange={(e) => handleInputChange('pmi', e.target.value)}
              />
              <Input
                label="HOA Fees (Monthly)"
                type="number"
                value={inputs.hoaFees}
                onChange={(e) => handleInputChange('hoaFees', e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="space-y-6">
          {/* Monthly Payment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-primary text-white rounded-card shadow-premium p-8 text-center"
          >
            <h2 className="text-2xl font-display font-semibold mb-2">
              Monthly Payment
            </h2>
            <p className="text-5xl font-display font-bold mb-2">
              {formatPrice(results.monthlyPayment)}
            </p>
            <p className="text-white/80">
              Principal, Interest, Taxes & Insurance
            </p>
          </motion.div>
          
          {/* Payment Breakdown */}
          <div className="bg-white rounded-card shadow-card p-6">
            <h3 className="text-xl font-display font-semibold text-primary mb-4">
              Monthly Payment Breakdown
            </h3>
            
            <div className="space-y-3">
              {paymentBreakdown.map((item, index) => (
                <div key={item.label} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded ${item.color}`}></div>
                    <span className="text-gray-700">{item.label}</span>
                  </div>
                  <span className="font-semibold text-primary">
                    {formatPrice(item.amount)}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Visual Breakdown */}
            <div className="mt-6">
              <div className="flex rounded-lg overflow-hidden h-3">
                {paymentBreakdown.map((item, index) => {
                  const percentage = totalBreakdown > 0 ? (item.amount / totalBreakdown) * 100 : 0
                  return (
                    <div
                      key={index}
                      className={item.color}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  )
                })}
              </div>
            </div>
          </div>
          
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-card shadow-card p-6 text-center">
              <ApperIcon name="DollarSign" size={32} className="text-accent mx-auto mb-3" />
              <p className="text-2xl font-bold price-text">
                {formatPrice(results.totalInterest)}
              </p>
              <p className="text-gray-600">Total Interest</p>
            </div>
            
            <div className="bg-white rounded-card shadow-card p-6 text-center">
              <ApperIcon name="Calculator" size={32} className="text-secondary mx-auto mb-3" />
              <p className="text-2xl font-bold price-text">
                {formatPrice(results.totalPayments)}
              </p>
              <p className="text-gray-600">Total Payments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MortgageCalculator