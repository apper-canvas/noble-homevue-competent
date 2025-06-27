import { toast } from 'react-toastify'

const getApperClient = () => {
  const { ApperClient } = window.ApperSDK
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  })
}

export const neighborhoodService = {
  async getByPropertyId(propertyId) {
    try {
      const apperClient = getApperClient()
      
      // First get the property to find its neighborhood_id
      const propertyParams = {
        fields: [{ field: { Name: "neighborhood_id" } }]
      }
      
      const propertyResponse = await apperClient.getRecordById('property', parseInt(propertyId), propertyParams)
      
      if (!propertyResponse.success || !propertyResponse.data?.neighborhood_id) {
        return null
      }
      
      // Then get the neighborhood data
      const neighborhoodParams = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "schools" } },
          { field: { Name: "transit" } },
          { field: { Name: "amenities" } }
        ]
      }
      
      const neighborhoodResponse = await apperClient.getRecordById('neighborhood', propertyResponse.data.neighborhood_id, neighborhoodParams)
      
      if (!neighborhoodResponse.success) {
        console.error(neighborhoodResponse.message)
        return null
      }
      
      return neighborhoodResponse.data
    } catch (error) {
      console.error('Error fetching neighborhood:', error)
      return null
    }
  }
}