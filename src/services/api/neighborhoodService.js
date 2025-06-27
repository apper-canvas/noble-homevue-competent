import { properties } from '@/services/mockData/properties.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const neighborhoodService = {
  async getByPropertyId(propertyId) {
    await delay(300)
    const property = properties.find(p => p.id === propertyId)
    return property?.neighborhood ? { ...property.neighborhood } : null
  }
}