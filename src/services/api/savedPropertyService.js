import { toast } from 'react-toastify'

const getApperClient = () => {
  const { ApperClient } = window.ApperSDK
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  })
}

export const savedPropertyService = {
  async getAll() {
    try {
      const apperClient = getApperClient()
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "property_id" } },
          { field: { Name: "saved_date" } },
          { field: { Name: "notes" } },
          { field: { Name: "user_id" } }
        ]
      }
      
      const response = await apperClient.fetchRecords('saved_property', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }
      
      return response.data || []
    } catch (error) {
      console.error('Error fetching saved properties:', error)
      toast.error('Failed to fetch saved properties')
      return []
    }
  },
  
  async getById(id) {
    try {
      const apperClient = getApperClient()
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "property_id" } },
          { field: { Name: "saved_date" } },
          { field: { Name: "notes" } },
          { field: { Name: "user_id" } }
        ]
      }
      
      const response = await apperClient.getRecordById('saved_property', parseInt(id), params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }
      
      return response.data
    } catch (error) {
      console.error('Error fetching saved property:', error)
      toast.error('Failed to fetch saved property')
      return null
    }
  },
  
  async create(savedData) {
    try {
      const apperClient = getApperClient()
      const updateableFields = {
        Name: savedData.Name || 'Saved Property',
        property_id: savedData.property_id,
        saved_date: savedData.saved_date || new Date().toISOString(),
        notes: savedData.notes || '',
        user_id: savedData.user_id
      }
      
      const params = { records: [updateableFields] }
      const response = await apperClient.createRecord('saved_property', params)
      
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
          toast.success('Property saved successfully')
          return successfulRecord.data
        }
      }
      
      return null
    } catch (error) {
      console.error('Error saving property:', error)
      toast.error('Failed to save property')
      return null
    }
  },
  
  async update(id, savedData) {
    try {
      const apperClient = getApperClient()
      const updateableFields = {
        Id: parseInt(id)
      }
      
      if (savedData.Name !== undefined) updateableFields.Name = savedData.Name
      if (savedData.property_id !== undefined) updateableFields.property_id = savedData.property_id
      if (savedData.saved_date !== undefined) updateableFields.saved_date = savedData.saved_date
      if (savedData.notes !== undefined) updateableFields.notes = savedData.notes
      if (savedData.user_id !== undefined) updateableFields.user_id = savedData.user_id
      
      const params = { records: [updateableFields] }
      const response = await apperClient.updateRecord('saved_property', params)
      
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
          toast.success('Saved property updated successfully')
          return successfulRecord.data
        }
      }
      
      return null
    } catch (error) {
      console.error('Error updating saved property:', error)
      toast.error('Failed to update saved property')
      return null
    }
  },
  
  async delete(id) {
    try {
      const apperClient = getApperClient()
      const params = { RecordIds: [parseInt(id)] }
      const response = await apperClient.deleteRecord('saved_property', params)
      
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
        
        toast.success('Saved property deleted successfully')
        return true
      }
      
      return false
    } catch (error) {
      console.error('Error deleting saved property:', error)
      toast.error('Failed to delete saved property')
      return false
    }
  }
}