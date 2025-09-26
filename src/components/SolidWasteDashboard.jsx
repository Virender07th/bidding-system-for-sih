import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Plus, Eye, Trash2, TrendingUp, Users, Clock, DollarSign, 
  Recycle, Factory, Truck, Shield, BarChart3, MapPin, 
  Calendar, Filter, Search, AlertCircle, CheckCircle 
} from 'lucide-react'

const SolidWasteDashboard = ({ user }) => {
  const [wasteTenders, setWasteTenders] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [stats, setStats] = useState({
    totalTenders: 0,
    activeTenders: 0,
    totalWaste: 0,
    totalRevenue: 0,
    recyclers: 0,
    municipalities: 0
  })
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Load waste tenders from localStorage
    const savedTenders = localStorage.getItem('wasteTenders')
    if (savedTenders) {
      setWasteTenders(JSON.parse(savedTenders))
    }
  }, [])

  useEffect(() => {
    // Calculate stats
    const activeTenders = wasteTenders.filter(tender => tender.status === 'active').length
    const totalWaste = wasteTenders.reduce((sum, tender) => sum + (tender.quantity || 0), 0)
    const totalRevenue = wasteTenders.reduce((sum, tender) => sum + (tender.currentBid || tender.startingBid || 0), 0)
    
    setStats({
      totalTenders: wasteTenders.length,
      activeTenders,
      totalWaste,
      totalRevenue,
      recyclers: parseInt(localStorage.getItem('recyclerCount') || '0'),
      municipalities: parseInt(localStorage.getItem('municipalityCount') || '0')
    })
  }, [wasteTenders])

  const getWasteTypeIcon = (type) => {
    switch(type) {
      case 'organic': return <Trash2 className="h-5 w-5" />
      case 'industrial': return <Factory className="h-5 w-5" />
      case 'municipal': return <Truck className="h-5 w-5" />
      case 'recyclable': return <Recycle className="h-5 w-5" />
      default: return <Trash2 className="h-5 w-5" />
    }
  }

  const getWasteTypeColor = (type) => {
    switch(type) {
      case 'organic': return 'bg-green-100 text-green-800'
      case 'industrial': return 'bg-blue-100 text-blue-800'
      case 'municipal': return 'bg-yellow-100 text-yellow-800'
      case 'recyclable': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredTenders = wasteTenders.filter(tender => {
    const matchesFilter = filter === 'all' || tender.status === filter
    const matchesSearch = tender.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        tender.wasteType.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-green-800 mb-2">
              Solid Waste Management Dashboard
            </h1>
            <p className="text-green-600 text-lg">
              {user.role === 'admin' 
                ? 'Manage waste disposal tenders and track collection' 
                : 'Browse and bid on solid waste disposal opportunities'
              }
            </p>
          </div>
          {user.role === 'admin' && (
            <button 
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 mt-4 lg:mt-0"
              onClick={() => setShowCreateForm(true)}
            >
              <Plus className="h-5 w-5" />
              <span>Create Waste Tender</span>
            </button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 p-6 rounded-xl">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-green-800">{stats.totalTenders}</p>
                <p className="text-green-600 text-sm font-medium">Total Tenders</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 p-6 rounded-xl">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-green-800">{stats.activeTenders}</p>
                <p className="text-green-600 text-sm font-medium">Active Tenders</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 p-6 rounded-xl">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Trash2 className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-green-800">{stats.totalWaste.toLocaleString()}</p>
                <p className="text-green-600 text-sm font-medium">Tonnes Waste</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 p-6 rounded-xl">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-green-800">₹{stats.totalRevenue.toLocaleString()}</p>
                <p className="text-green-600 text-sm font-medium">Total Value</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search waste tenders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Waste Tenders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTenders.map(tender => (
            <div key={tender.id} className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2">
                    {getWasteTypeIcon(tender.wasteType)}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getWasteTypeColor(tender.wasteType)}`}>
                      {tender.wasteType}
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    tender.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : tender.status === 'completed'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {tender.status}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                  {tender.description}
                </h3>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Quantity:</span>
                    <span className="text-green-600 font-semibold">{tender.quantity} tonnes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Starting Bid:</span>
                    <span className="text-green-600 font-semibold">₹{tender.startingBid}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Current Bid:</span>
                    <span className="text-green-600 font-semibold">₹{tender.currentBid || tender.startingBid}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Location:</span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{tender.location}</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Deadline:</span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(tender.deadline).toLocaleDateString()}</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Bidders:</span>
                    <span className="text-green-600 font-semibold">{tender.bidders?.length || 0}</span>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex space-x-2">
                <Link 
                  to={`/live-bid/${tender.id}`} 
                  className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg text-center text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Eye className="h-4 w-4" />
                  <span>{tender.status === 'active' ? 'Live Bid' : 'View Details'}</span>
                </Link>
                {user.role === 'admin' && tender.status === 'active' && (
                  <button className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    End Tender
                  </button>
                )}
                {user.role === 'admin' && (
                  <button className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredTenders.length === 0 && (
          <div className="text-center py-12">
            <Trash2 className="h-16 w-16 text-green-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No waste tenders found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'No solid waste tenders are available at the moment.'
              }
            </p>
            {user.role === 'admin' && (
              <button 
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 mx-auto"
              >
                <Plus className="h-5 w-5" />
                <span>Create First Tender</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SolidWasteDashboard
