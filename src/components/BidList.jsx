import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Eye, Clock, DollarSign, Weight, Filter, Search, 
  Trash2, Factory, Truck, Recycle, MapPin, Users, 
  TrendingUp, Calendar, AlertCircle
} from 'lucide-react'

const BidList = ({ user }) => {
  const [tenders, setTenders] = useState([])
  const [filteredTenders, setFilteredTenders] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [wasteTypeFilter, setWasteTypeFilter] = useState('all')

  useEffect(() => {
    // Load waste tenders from localStorage
    const savedTenders = localStorage.getItem('wasteTenders')
    if (savedTenders) {
      setTenders(JSON.parse(savedTenders))
    }
  }, [])

  useEffect(() => {
    let filtered = tenders

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(tender =>
        tender.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tender.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(tender => tender.status === statusFilter)
    }

    // Filter by waste type
    if (wasteTypeFilter !== 'all') {
      filtered = filtered.filter(tender => tender.wasteType === wasteTypeFilter)
    }

    setFilteredTenders(filtered)
  }, [tenders, searchTerm, statusFilter, wasteTypeFilter])

  const getTimeRemaining = (tender) => {
    const now = new Date()
    const deadline = new Date(tender.deadline)
    const timeDiff = deadline - now

    if (timeDiff <= 0) return 'Expired'

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `${days}d ${hours}h ${minutes}m`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  const isUserBidding = (tender) => {
    return tender.bidders?.some(bidder => bidder.userId === user.id)
  }

  const getWasteTypeIcon = (type) => {
    switch(type) {
      case 'organic': return <Trash2 className="h-6 w-6" />
      case 'industrial': return <Factory className="h-6 w-6" />
      case 'municipal': return <Truck className="h-6 w-6" />
      case 'recyclable': return <Recycle className="h-6 w-6" />
      default: return <Trash2 className="h-6 w-6" />
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Waste Tender Bids</h1>
          <p className="text-xl text-green-600">Browse and participate in solid waste management tenders</p>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by description or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <select
              value={wasteTypeFilter}
              onChange={(e) => setWasteTypeFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Waste Types</option>
              <option value="organic">Organic</option>
              <option value="industrial">Industrial</option>
              <option value="municipal">Municipal</option>
              <option value="recyclable">Recyclable</option>
            </select>
          </div>
        </div>

        {/* Tenders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTenders.map(tender => (
            <div key={tender.id} className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getWasteTypeIcon(tender.wasteType)}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{tender.description}</h3>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getWasteTypeColor(tender.wasteType)}`}>
                          {tender.wasteType}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          tender.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {tender.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {isUserBidding(tender) && (
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      You're Bidding
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{tender.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Weight className="h-4 w-4" />
                    <span className="text-sm">{tender.quantity} tonnes</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{new Date(tender.collectionDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{tender.bidders?.length || 0} bidders</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Starting Bid</p>
                      <p className="text-lg font-bold text-green-600">₹{tender.startingBid.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Current Bid</p>
                      <p className="text-lg font-bold text-green-600">₹{(tender.currentBid || tender.startingBid).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {tender.status === 'active' ? (
                          <span className="text-red-600 font-medium">
                            {getTimeRemaining(tender)} remaining
                          </span>
                        ) : (
                          <span className="text-gray-500">Bid Ended</span>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Link 
                      to={`/live-bid/${tender.id}`} 
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-center text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>{tender.status === 'active' ? 'Live Bid' : 'View Details'}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredTenders.length === 0 && (
            <div className="col-span-full text-center py-12">
              <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">No tenders found</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== 'all' || wasteTypeFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No waste management tenders are available at the moment.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BidList
