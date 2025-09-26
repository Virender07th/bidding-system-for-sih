import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Eye, Edit, Trash2, TrendingUp, Users, Clock, DollarSign } from 'lucide-react'
import BidForm from './BidForm'

const AdminDashboard = ({ user }) => {
  const [bids, setBids] = useState([])
  const [showBidForm, setShowBidForm] = useState(false)
  const [stats, setStats] = useState({
    totalBids: 0,
    activeBids: 0,
    totalUsers: 0,
    totalRevenue: 0
  })

  useEffect(() => {
    // Load bids from localStorage
    const savedBids = localStorage.getItem('bids')
    if (savedBids) {
      setBids(JSON.parse(savedBids))
    }
  }, [])

  useEffect(() => {
    // Calculate stats
    const activeBids = bids.filter(bid => bid.status === 'active').length
    const totalRevenue = bids.reduce((sum, bid) => sum + (bid.currentBid || 0), 0)
    
    setStats({
      totalBids: bids.length,
      activeBids,
      totalUsers: parseInt(localStorage.getItem('userCount') || '0'),
      totalRevenue
    })
  }, [bids])

  const handleCreateBid = (bidData) => {
    const newBid = {
      id: Date.now(),
      ...bidData,
      status: 'active',
      createdAt: new Date().toISOString(),
      bidders: []
    }
    const updatedBids = [...bids, newBid]
    setBids(updatedBids)
    localStorage.setItem('bids', JSON.stringify(updatedBids))
    setShowBidForm(false)
  }

  const handleDeleteBid = (bidId) => {
    const updatedBids = bids.filter(bid => bid.id !== bidId)
    setBids(updatedBids)
    localStorage.setItem('bids', JSON.stringify(updatedBids))
  }

  const handleEndBid = (bidId) => {
    const updatedBids = bids.map(bid => 
      bid.id === bidId ? { ...bid, status: 'ended' } : bid
    )
    setBids(updatedBids)
    localStorage.setItem('bids', JSON.stringify(updatedBids))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-green-800 mb-2">
              Municipality Dashboard
            </h1>
            <p className="text-green-600 text-lg">
              Manage waste tenders for a cleaner India
            </p>
          </div>
          <button 
            className="green-india-button flex items-center space-x-2 mt-4 lg:mt-0"
            onClick={() => setShowBidForm(true)}
          >
            <Plus className="h-5 w-5" />
            <span>Create New Tender</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="clean-india-card p-6 rounded-xl">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-green-800">{stats.totalBids}</p>
                <p className="text-green-600 text-sm font-medium">Total Tenders</p>
              </div>
            </div>
          </div>
          <div className="clean-india-card p-6 rounded-xl">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-green-800">{stats.activeBids}</p>
                <p className="text-green-600 text-sm font-medium">Active Tenders</p>
              </div>
            </div>
          </div>
          <div className="clean-india-card p-6 rounded-xl">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-green-800">{stats.totalUsers}</p>
                <p className="text-green-600 text-sm font-medium">Registered Recyclers</p>
              </div>
            </div>
          </div>
          <div className="clean-india-card p-6 rounded-xl">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-green-800">₹{stats.totalRevenue.toLocaleString()}</p>
                <p className="text-green-600 text-sm font-medium">Total Revenue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bids List */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-green-800 mb-6">Manage Waste Tenders</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {bids.map(bid => (
              <div key={bid.id} className="clean-india-card rounded-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{bid.wasteDescription}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      bid.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {bid.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span className="font-medium">Date:</span>
                      <span>{new Date(bid.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Time:</span>
                      <span>{bid.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Starting Bid:</span>
                      <span className="text-green-600 font-semibold">₹{bid.startingBid}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Availability:</span>
                      <span>{bid.availability} tonnes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Current Bid:</span>
                      <span className="text-green-600 font-semibold">₹{bid.currentBid || bid.startingBid}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Bidders:</span>
                      <span className="text-green-600 font-semibold">{bid.bidders?.length || 0}</span>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex space-x-2">
                  <Link to={`/bid/${bid.id}`} className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg text-center text-sm font-medium transition-colors">
                    <Eye className="h-4 w-4 inline mr-2" />
                    View
                  </Link>
                  {bid.status === 'active' && (
                    <button 
                      className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      onClick={() => handleEndBid(bid.id)}
                    >
                      End Bid
                    </button>
                  )}
                  <button 
                    className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    onClick={() => handleDeleteBid(bid.id)}
                  >
                    <Trash2 className="h-4 w-4 inline mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showBidForm && (
          <BidForm 
            onSubmit={handleCreateBid}
            onCancel={() => setShowBidForm(false)}
          />
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
