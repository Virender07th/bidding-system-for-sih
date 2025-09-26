import { useEffect } from 'react'
import { initializeMockData } from '../utils/mockData'

const DataInitializer = () => {
  useEffect(() => {
    // Initialize mock data if not already present
    if (!localStorage.getItem('wasteTenders')) {
      console.log('Initializing mock data for Clean India Solid Waste Bidding Platform...')
      initializeMockData()
      console.log('Mock data initialized successfully!')
    }
  }, [])

  return null // This component doesn't render anything
}

export default DataInitializer
