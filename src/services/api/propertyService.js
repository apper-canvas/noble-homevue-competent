import { properties } from '@/services/mockData/properties.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const propertyService = {
  async getAll() {
    await delay(300)
    return [...properties].map(property => ({ ...property }))
  },
  
  async getById(id) {
    await delay(200)
    const property = properties.find(p => p.id === id)
    return property ? { ...property } : null
  },
  
  async create(propertyData) {
    await delay(400)
    const maxId = Math.max(...properties.map(p => parseInt(p.id)), 0)
    const newProperty = {
      ...propertyData,
      id: (maxId + 1).toString(),
      listingDate: new Date().toISOString()
    }
    properties.push(newProperty)
    return { ...newProperty }
  },
  
  async update(id, propertyData) {
    await delay(400)
    const index = properties.findIndex(p => p.id === id)
    if (index === -1) return null
    
    properties[index] = { ...properties[index], ...propertyData }
    return { ...properties[index] }
  },
  
  async delete(id) {
    await delay(300)
    const index = properties.findIndex(p => p.id === id)
    if (index === -1) return false
    
    properties.splice(index, 1)
    return true
  }
}