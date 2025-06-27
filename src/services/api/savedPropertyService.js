// Mock saved properties data - in a real app, this would be stored in a database
let savedProperties = []

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const savedPropertyService = {
  async getAll() {
    await delay(200)
    return [...savedProperties].map(saved => ({ ...saved }))
  },
  
  async getById(id) {
    await delay(150)
    const saved = savedProperties.find(s => s.id === parseInt(id))
    return saved ? { ...saved } : null
  },
  
  async create(savedData) {
    await delay(300)
    const maxId = savedProperties.length > 0 ? Math.max(...savedProperties.map(s => s.id)) : 0
    const newSaved = {
      ...savedData,
      id: maxId + 1
    }
    savedProperties.push(newSaved)
    return { ...newSaved }
  },
  
  async update(id, savedData) {
    await delay(300)
    const index = savedProperties.findIndex(s => s.id === parseInt(id))
    if (index === -1) return null
    
    savedProperties[index] = { ...savedProperties[index], ...savedData }
    return { ...savedProperties[index] }
  },
  
  async delete(id) {
    await delay(200)
    const index = savedProperties.findIndex(s => s.id === parseInt(id))
    if (index === -1) return false
    
    savedProperties.splice(index, 1)
    return true
  }
}