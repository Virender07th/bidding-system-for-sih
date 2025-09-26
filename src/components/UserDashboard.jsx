import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Eye, Clock, DollarSign, Package, TrendingUp, Calendar } from 'lucide-react'

const UserDashboard = ({ user }) => {
  const [bids, setBids] = useState([])
  const [userStats, setUserStats] = useState({
    totalBids: 0,
    activeBids: 0,
    wonBids: 0,
    totalSpent: 0
  })

  useEffect(() => {
    // Load bids from localStorage
    const savedBids = localStorage.getItem('bids')
    if (savedBids) {
      setBids(JSON.parse(savedBids))
    }
  }, [])

  useEffect(() => {
    // Calculate user stats
    const userBids = bids.filter(bid => 
      bid.bidders?.some(bidder => bidder.userId === user.id)
    )
    const activeBids = userBids.filter(bid => bid.status === 'active')
    const wonBids = userBids.filter(bid => bid.winnerId === user.id)
    const totalSpent = wonBids.reduce((sum, bid) => sum + bid.currentBid, 0)

    setUserStats({
      totalBids: userBids.length,
      activeBids: activeBids.length,
      wonBids: wonBids.length,
      totalSpent
    })
  }, [bids, user.id])

  const getMyBids = () => {
    return bids.filter(bid => 
      bid.bidders?.some(bidder => bidder.userId === user.id)
    )
  }

  const getUpcomingBids = () => {
    const now = new Date()
    return bids.filter(bid => {
      const bidDateTime = new Date(`${bid.date}T${bid.time}`)
      return bid.status === 'active' && bidDateTime > now
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            Welcome, {user.name}!
          </h1>
          <p className="text-green-600 text-lg">
            Manage your waste bidding activities for Clean India
          </p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="clean-india-card p-6 rounded-xl">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-green-800">{userStats.totalBids}</p>
                <p className="text-green-600 text-sm font-medium">Total Bids</p>
              </div>
            </div>
          </div>
          <div className="clean-india-card p-6 rounded-xl">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-green-800">{userStats.activeBids}</p>
                <p className="text-green-600 text-sm font-medium">Active Bids</p>
              </div>
            </div>
          </div>
          <div className="clean-india-card p-6 rounded-xl">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-green-800">{userStats.wonBids}</p>
                <p className="text-green-600 text-sm font-medium">Won Bids</p>
              </div>
            </div>
          </div>
          <div className="clean-india-card p-6 rounded-xl">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-green-800">₹{userStats.totalSpent.toLocaleString()}</p>
                <p className="text-green-600 text-sm font-medium">Total Spent</p>
              </div>
            </div>
          </div>
        </div>

        {/* My Orders */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-green-800 mb-6">My Orders</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {getMyBids().map(bid => (
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
                      <span className="font-medium">My Bid:</span>
                      <span className="text-green-600 font-semibold">₹{bid.bidders?.find(b => b.userId === user.id)?.amount || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Current Bid:</span>
                      <span className="text-green-600 font-semibold">₹{bid.currentBid || bid.startingBid}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Availability:</span>
                      <span>{bid.availability} tonnes</span>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <Link to={`/bid/${bid.id}`} className="w-full bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg text-center text-sm font-medium transition-colors flex items-center justify-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>View Details</span>
                  </Link>
                </div>
              </div>
            ))}
            {getMyBids().length === 0 && (
              <div className="col-span-full text-center py-12">
                <Package className="h-16 w-16 text-green-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders yet</h3>
                <p className="text-gray-500 mb-6">Start bidding on available waste tenders!</p>
                <Link to="/bids" className="green-india-button inline-flex items-center space-x-2">
                  <span>Browse Available Bids</span>
                  <Eye className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Bids */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-green-800 mb-6">Upcoming Bids</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {getUpcomingBids().map(bid => (
              <div key={bid.id} className="clean-india-card rounded-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{bid.wasteDescription}</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
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
                      <span className="font-medium">Current Bid:</span>
                      <span className="text-green-600 font-semibold">₹{bid.currentBid || bid.startingBid}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Availability:</span>
                      <span>{bid.availability} tonnes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Bidders:</span>
                      <span className="text-green-600 font-semibold">{bid.bidders?.length || 0}</span>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <Link to={`/bid/${bid.id}`} className="w-full bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg text-center text-sm font-medium transition-colors flex items-center justify-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>Join Bid</span>
                  </Link>
                </div>
              </div>
            ))}
            {getUpcomingBids().length === 0 && (
              <div className="col-span-full text-center py-12">
                <Calendar className="h-16 w-16 text-green-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No upcoming bids</h3>
                <p className="text-gray-500">No upcoming waste tenders available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
