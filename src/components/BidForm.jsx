import { useState } from 'react'
import { X, Calendar, Clock, DollarSign, FileText, Weight } from 'lucide-react'

const BidForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    startingBid: '',
    wasteDescription: '',
    availability: '',
    availabilityFrom: '',
    availabilityTo: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-green-800">Create New Waste Tender</h2>
            <p className="text-green-600 text-sm">Contribute to Clean India initiative</p>
          </div>
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Tender Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                Tender Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="startingBid" className="block text-sm font-medium text-gray-700 mb-2">
              Starting Bid Amount (₹)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                id="startingBid"
                name="startingBid"
                value={formData.startingBid}
                onChange={handleChange}
                required
                placeholder="Enter starting bid amount"
                min="0"
                step="100"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="wasteDescription" className="block text-sm font-medium text-gray-700 mb-2">
              Waste Description
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
              <textarea
                id="wasteDescription"
                name="wasteDescription"
                value={formData.wasteDescription}
                onChange={handleChange}
                required
                placeholder="Describe the type of waste, condition, recycling potential, etc."
                rows="3"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
              Waste Availability (Tonnes)
            </label>
            <div className="relative">
              <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                required
                placeholder="Total tonnes available"
                min="0"
                step="0.1"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="availabilityFrom" className="block text-sm font-medium text-gray-700 mb-2">
                Available From
              </label>
              <input
                type="date"
                id="availabilityFrom"
                name="availabilityFrom"
                value={formData.availabilityFrom}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="availabilityTo" className="block text-sm font-medium text-gray-700 mb-2">
                Available To
              </label>
              <input
                type="date"
                id="availabilityTo"
                name="availabilityTo"
                value={formData.availabilityTo}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button 
              type="button" 
              onClick={onCancel} 
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="green-india-button flex items-center space-x-2"
            >
              <span>Create Tender</span>
              <Weight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BidForm
