import { useState } from 'react'
import { X, Calendar, Clock, DollarSign, FileText, Weight, MapPin, Trash2, Factory, Truck, Recycle } from 'lucide-react'

const WasteTenderForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    description: '',
    wasteType: 'organic',
    quantity: '',
    startingBid: '',
    location: '',
    deadline: '',
    collectionDate: '',
    specialInstructions: ''
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

  const wasteTypes = [
    { value: 'organic', label: 'Organic Waste', icon: <Trash2 className="h-5 w-5" />, color: 'bg-green-100 text-green-800' },
    { value: 'industrial', label: 'Industrial Waste', icon: <Factory className="h-5 w-5" />, color: 'bg-blue-100 text-blue-800' },
    { value: 'municipal', label: 'Municipal Waste', icon: <Truck className="h-5 w-5" />, color: 'bg-yellow-100 text-yellow-800' },
    { value: 'recyclable', label: 'Recyclable Waste', icon: <Recycle className="h-5 w-5" />, color: 'bg-purple-100 text-purple-800' }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-green-800">Create Solid Waste Tender</h2>
            <p className="text-green-600 text-sm">Contribute to Clean India initiative</p>
          </div>
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Waste Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Waste Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              {wasteTypes.map(type => (
                <label key={type.value} className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-300 transition-colors">
                  <input
                    type="radio"
                    name="wasteType"
                    value={type.value}
                    checked={formData.wasteType === type.value}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <div className="ml-3 flex items-center space-x-3">
                    {type.icon}
                    <span className="text-sm font-medium text-gray-900">{type.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Waste Description
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Describe the type of solid waste, condition, composition, etc."
                rows="3"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Quantity and Starting Bid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity (Tonnes)
              </label>
              <div className="relative">
                <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  placeholder="Enter quantity in tonnes"
                  min="0"
                  step="0.1"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="startingBid" className="block text-sm font-medium text-gray-700 mb-2">
                Starting Bid (₹)
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
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Collection Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Enter collection address/location"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                Bidding Deadline
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="datetime-local"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="collectionDate" className="block text-sm font-medium text-gray-700 mb-2">
                Collection Date
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  id="collectionDate"
                  name="collectionDate"
                  value={formData.collectionDate}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-2">
              Special Instructions (Optional)
            </label>
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleChange}
              placeholder="Any special handling requirements, access instructions, etc."
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
            />
          </div>

          {/* Form Actions */}
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
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
            >
              <span>Create Waste Tender</span>
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default WasteTenderForm
