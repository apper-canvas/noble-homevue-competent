import { toast } from 'react-toastify'

const getApperClient = () => {
  const { ApperClient } = window.ApperSDK
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  })
}

export const propertyService = {
  async getAll() {
    try {
      const apperClient = getApperClient()
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "price" } },
          { field: { Name: "address" } },
          { field: { Name: "city" } },
          { field: { Name: "state" } },
          { field: { Name: "zip_code" } },
          { field: { Name: "latitude" } },
          { field: { Name: "longitude" } },
          { field: { Name: "property_type" } },
          { field: { Name: "bedrooms" } },
          { field: { Name: "bathrooms" } },
          { field: { Name: "square_feet" } },
          { field: { Name: "year_built" } },
          { field: { Name: "description" } },
          { field: { Name: "features" } },
          { field: { Name: "images" } },
          { field: { Name: "listing_date" } },
          { field: { Name: "status" } },
          { field: { Name: "neighborhood_id" } }
        ]
      }
      
      const response = await apperClient.fetchRecords('property', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      return response.data || []
    } catch (error) {
      console.error('Error fetching properties:', error)
      toast.error('Failed to fetch properties')
      return []
    }
  },
  
  async getById(id) {
    try {
      const apperClient = getApperClient()
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "price" } },
          { field: { Name: "address" } },
          { field: { Name: "city" } },
          { field: { Name: "state" } },
          { field: { Name: "zip_code" } },
          { field: { Name: "latitude" } },
          { field: { Name: "longitude" } },
          { field: { Name: "property_type" } },
          { field: { Name: "bedrooms" } },
          { field: { Name: "bathrooms" } },
          { field: { Name: "square_feet" } },
          { field: { Name: "year_built" } },
          { field: { Name: "description" } },
          { field: { Name: "features" } },
          { field: { Name: "images" } },
          { field: { Name: "listing_date" } },
          { field: { Name: "status" } },
          { field: { Name: "neighborhood_id" } }
        ]
      }
      
      const response = await apperClient.getRecordById('property', parseInt(id), params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      return response.data
    } catch (error) {
      console.error('Error fetching property:', error)
      toast.error('Failed to fetch property')
      return null
    }
  },
  
  async create(propertyData) {
    try {
      const apperClient = getApperClient()
      const updateableFields = {
        Name: propertyData.Name,
        title: propertyData.title,
        price: propertyData.price,
        address: propertyData.address,
        city: propertyData.city,
        state: propertyData.state,
        zip_code: propertyData.zip_code,
        latitude: propertyData.latitude,
        longitude: propertyData.longitude,
        property_type: propertyData.property_type,
        bedrooms: propertyData.bedrooms,
        bathrooms: propertyData.bathrooms,
        square_feet: propertyData.square_feet,
        year_built: propertyData.year_built,
        description: propertyData.description,
        features: propertyData.features,
        images: propertyData.images,
        listing_date: propertyData.listing_date || new Date().toISOString(),
        status: propertyData.status || 'For Sale',
        neighborhood_id: propertyData.neighborhood_id
      }
      
      const params = { records: [updateableFields] }
      const response = await apperClient.createRecord('property', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success)
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) toast.error(record.message)
          })
          return null
        }
        
        const successfulRecord = response.results.find(result => result.success)
        if (successfulRecord) {
          toast.success('Property created successfully')
          return successfulRecord.data
        }
      }
      
      return null
    } catch (error) {
      console.error('Error creating property:', error)
      toast.error('Failed to create property')
      return null
    }
  },
  
  async update(id, propertyData) {
    try {
      const apperClient = getApperClient()
      const updateableFields = {
        Id: parseInt(id)
      }
      
      // Only include updateable fields that are provided
      if (propertyData.Name !== undefined) updateableFields.Name = propertyData.Name
      if (propertyData.title !== undefined) updateableFields.title = propertyData.title
      if (propertyData.price !== undefined) updateableFields.price = propertyData.price
      if (propertyData.address !== undefined) updateableFields.address = propertyData.address
      if (propertyData.city !== undefined) updateableFields.city = propertyData.city
      if (propertyData.state !== undefined) updateableFields.state = propertyData.state
      if (propertyData.zip_code !== undefined) updateableFields.zip_code = propertyData.zip_code
      if (propertyData.latitude !== undefined) updateableFields.latitude = propertyData.latitude
      if (propertyData.longitude !== undefined) updateableFields.longitude = propertyData.longitude
      if (propertyData.property_type !== undefined) updateableFields.property_type = propertyData.property_type
      if (propertyData.bedrooms !== undefined) updateableFields.bedrooms = propertyData.bedrooms
      if (propertyData.bathrooms !== undefined) updateableFields.bathrooms = propertyData.bathrooms
      if (propertyData.square_feet !== undefined) updateableFields.square_feet = propertyData.square_feet
      if (propertyData.year_built !== undefined) updateableFields.year_built = propertyData.year_built
      if (propertyData.description !== undefined) updateableFields.description = propertyData.description
      if (propertyData.features !== undefined) updateableFields.features = propertyData.features
      if (propertyData.images !== undefined) updateableFields.images = propertyData.images
      if (propertyData.listing_date !== undefined) updateableFields.listing_date = propertyData.listing_date
      if (propertyData.status !== undefined) updateableFields.status = propertyData.status
      if (propertyData.neighborhood_id !== undefined) updateableFields.neighborhood_id = propertyData.neighborhood_id
      
      const params = { records: [updateableFields] }
      const response = await apperClient.updateRecord('property', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success)
        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) toast.error(record.message)
          })
          return null
        }
        
        const successfulRecord = response.results.find(result => result.success)
        if (successfulRecord) {
          toast.success('Property updated successfully')
          return successfulRecord.data
        }
      }
      
      return null
    } catch (error) {
      console.error('Error updating property:', error)
      toast.error('Failed to update property')
      return null
    }
  },
  
  async delete(id) {
    try {
      const apperClient = getApperClient()
      const params = { RecordIds: [parseInt(id)] }
      const response = await apperClient.deleteRecord('property', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return false
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success)
        if (failedRecords.length > 0) {
          console.error(`Failed to delete ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          failedRecords.forEach(record => {
            if (record.message) toast.error(record.message)
          })
          return false
        }
        
        toast.success('Property deleted successfully')
        return true
      }
      
      return false
    } catch (error) {
      console.error('Error deleting property:', error)
      toast.error('Failed to delete property')
      return false
    }
  }
}