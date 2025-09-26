import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, Clock, DollarSign, Weight, Users, Trophy, AlertCircle,
  MapPin, Calendar, Trash2, Factory, Truck, Recycle, TrendingUp
} from 'lucide-react'

const BidInterface = ({ user }) => {
  const { id } = useParams()
  const [tender, setTender] = useState(null)
  const [bidAmount, setBidAmount] = useState('')
  const [timeRemaining, setTimeRemaining] = useState('')
  const [isBidding, setIsBidding] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Load tender data
    const savedTenders = localStorage.getItem('wasteTenders')
    if (savedTenders) {
      const tenders = JSON.parse(savedTenders)
      const currentTender = tenders.find(t => t.id === parseInt(id))
      setTender(currentTender)
      
      if (currentTender) {
        setBidAmount((currentTender.currentBid || currentTender.startingBid) + 100)
      }
    }
  }, [id])

  useEffect(() => {
    if (!tender) return

    const updateTimer = () => {
      const now = new Date()
      const deadline = new Date(tender.deadline)
      const timeDiff = deadline - now

      if (timeDiff <= 0) {
        setTimeRemaining('Bid Ended')
        return
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

      if (days > 0) {
        setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`)
      } else if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`)
      } else if (minutes > 0) {
        setTimeRemaining(`${minutes}m ${seconds}s`)
      } else {
        setTimeRemaining(`${seconds}s`)
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [tender])

  const handleBid = async () => {
    if (!bidAmount || bidAmount <= (tender.currentBid || tender.startingBid)) {
      setMessage('Bid amount must be higher than current bid')
      return
    }

    setIsBidding(true)
    setMessage('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Update tender in localStorage
      const savedTenders = localStorage.getItem('wasteTenders')
      const tenders = JSON.parse(savedTenders)
      const updatedTenders = tenders.map(t => {
        if (t.id === tender.id) {
          const existingBidderIndex = t.bidders?.findIndex(bidder => bidder.userId === user.id)
          const newBidder = {
            userId: user.id,
            userName: user.name,
            amount: parseInt(bidAmount),
            timestamp: new Date().toISOString(),
            isLive: true
          }

          let updatedBidders = [...(t.bidders || [])]
          if (existingBidderIndex >= 0) {
            updatedBidders[existingBidderIndex] = newBidder
          } else {
            updatedBidders.push(newBidder)
          }

          return {
            ...t,
            currentBid: parseInt(bidAmount),
            bidders: updatedBidders
          }
        }
        return t
      })

      localStorage.setItem('wasteTenders', JSON.stringify(updatedTenders))
      setTender(updatedTenders.find(t => t.id === tender.id))
      setMessage('Bid placed successfully!')
      
      // Update bid amount for next bid
      setBidAmount(parseInt(bidAmount) + 100)
    } catch (error) {
      setMessage('Failed to place bid. Please try again.')
    } finally {
      setIsBidding(false)
    }
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

  if (!tender) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-green-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Tender not found</h2>
          <p className="text-gray-500 mb-6">The waste tender you're looking for doesn't exist.</p>
          <Link to="/bids" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
            Back to Tenders
          </Link>
        </div>
      </div>
    )
  }

  const isUserBidding = tender.bidders?.some(bidder => bidder.userId === user.id)
  const userBid = tender.bidders?.find(bidder => bidder.userId === user.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/bids" className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Tenders</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tender Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tender Details */}
            <div className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg rounded-xl p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {getWasteTypeIcon(tender.wasteType)}
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{tender.description}</h1>
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
                
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">
                    ₹{tender.currentBid || tender.startingBid}
                  </div>
                  <div className="text-sm text-gray-500">Current Bid</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{tender.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>{new Date(tender.collectionDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span>{tender.bidders?.length || 0} bidders</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className={tender.status === 'active' ? 'text-red-600 font-medium' : 'text-gray-500'}>
                    {timeRemaining}
                  </span>
                </div>
              </div>
            </div>

            {/* Bidding Interface */}
            {tender.status === 'active' && (
              <div className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Place Your Bid</h2>
                
                {isUserBidding && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span className="text-green-800 font-medium">You're currently bidding</span>
                    </div>
                    <p className="text-green-700 text-sm mt-1">
                      Your current bid: <strong>₹{userBid?.amount}</strong>
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bid Amount (₹)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        min={(tender.currentBid || tender.startingBid) + 1}
                        step="100"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-lg font-semibold"
                        placeholder="Enter your bid amount"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Minimum bid: ₹{(tender.currentBid || tender.startingBid) + 1}
                    </p>
                  </div>

                  {message && (
                    <div className={`p-3 rounded-lg ${
                      message.includes('success') 
                        ? 'bg-green-50 text-green-800 border border-green-200' 
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                      {message}
                    </div>
                  )}

                  <button
                    onClick={handleBid}
                    disabled={isBidding || bidAmount <= (tender.currentBid || tender.startingBid)}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    {isBidding ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Placing Bid...</span>
                      </>
                    ) : (
                      <>
                        <Trophy className="h-5 w-5" />
                        <span>Place Bid</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {tender.status === 'completed' && (
              <div className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Bid Ended</h2>
                <p className="text-gray-600">This tender has ended. Check the results above.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Bidders */}
            <div className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Current Bidders</h3>
              <div className="space-y-3">
                {tender.bidders?.sort((a, b) => b.amount - a.amount).map((bidder, index) => (
                  <div key={bidder.userId} className={`flex items-center justify-between p-3 rounded-lg ${
                    bidder.userId === user.id 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {index === 0 ? <Trophy className="h-4 w-4" /> : <span className="text-sm font-bold">{index + 1}</span>}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {bidder.userName}
                          {bidder.userId === user.id && ' (You)'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(bidder.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">₹{bidder.amount}</p>
                      {index === 0 && (
                        <p className="text-xs text-yellow-600 font-medium">Leading</p>
                      )}
                    </div>
                  </div>
                ))}
                {(!tender.bidders || tender.bidders.length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p>No bidders yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tender Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Starting Bid</span>
                  <span className="font-semibold">₹{tender.startingBid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Bid</span>
                  <span className="font-semibold text-green-600">₹{tender.currentBid || tender.startingBid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Bidders</span>
                  <span className="font-semibold">{tender.bidders?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity</span>
                  <span className="font-semibold">{tender.quantity} tonnes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time Remaining</span>
                  <span className={`font-semibold ${tender.status === 'active' ? 'text-red-600' : 'text-gray-500'}`}>
                    {timeRemaining}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BidInterface
