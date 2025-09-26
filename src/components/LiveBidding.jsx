import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, Clock, DollarSign, Weight, Users, Trophy, AlertCircle, 
  Play, Pause, RotateCcw, TrendingUp, MapPin, Calendar, Bell,
  Trash2, Factory, Truck, Recycle, CheckCircle, XCircle, Zap,
  MessageCircle, Activity, Target, Award, Star
} from 'lucide-react'
import RealTimeBiddingSimulator from './RealTimeBiddingSimulator'
import MultiUserBiddingRoom from './MultiUserBiddingRoom'
import webSocketSimulator from '../utils/WebSocketSimulator'

const LiveBidding = ({ user }) => {
  const { id } = useParams()
  const [tender, setTender] = useState(null)
  const [bidAmount, setBidAmount] = useState('')
  const [timeRemaining, setTimeRemaining] = useState('')
  const [isBidding, setIsBidding] = useState(false)
  const [message, setMessage] = useState('')
  const [biddingHistory, setBiddingHistory] = useState([])
  const [isLive, setIsLive] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [showSimulator, setShowSimulator] = useState(false)
  const [showBiddingRoom, setShowBiddingRoom] = useState(false)
  const [liveBidders, setLiveBidders] = useState([])
  const [recentBids, setRecentBids] = useState([])
  const [bidNotifications, setBidNotifications] = useState([])
  const [isConnected, setIsConnected] = useState(true)
  const [connectionStatus, setConnectionStatus] = useState('Connected')
  const intervalRef = useRef(null)
  const notificationTimeoutRef = useRef(null)

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

    // Initialize WebSocket connection
    webSocketSimulator.setCurrentTender(parseInt(id))
    webSocketSimulator.connect()

    // Handle WebSocket messages
    const handleMessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        
        switch (data.type) {
          case 'bid_placed':
            handleIncomingBid(data)
            break
          case 'user_activity':
            handleUserActivity(data)
            break
          case 'chat_message':
            handleChatMessage(data)
            break
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error)
      }
    }

    const handleOpen = () => {
      setIsConnected(true)
      setConnectionStatus('Connected')
    }

    const handleClose = () => {
      setIsConnected(false)
      setConnectionStatus('Disconnected')
    }

    const handlePing = () => {
      // Heartbeat received
    }

    webSocketSimulator.on('open', handleOpen)
    webSocketSimulator.on('close', handleClose)
    webSocketSimulator.on('message', handleMessage)
    webSocketSimulator.on('ping', handlePing)

    return () => {
      webSocketSimulator.off('open', handleOpen)
      webSocketSimulator.off('close', handleClose)
      webSocketSimulator.off('message', handleMessage)
      webSocketSimulator.off('ping', handlePing)
      webSocketSimulator.disconnect()
    }
  }, [id])

  useEffect(() => {
    if (!tender) return

    const updateTimer = () => {
      const now = new Date()
      const tenderDeadline = new Date(tender.deadline)
      const timeDiff = tenderDeadline - now

      if (timeDiff <= 0) {
        setTimeRemaining('Bidding Ended')
        setIsLive(false)
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

  // Multi-user live bidding system
  useEffect(() => {
    if (!autoRefresh || !isLive) return

    intervalRef.current = setInterval(() => {
      // Simulate real-time updates from multiple users
      const savedTenders = localStorage.getItem('wasteTenders')
      if (savedTenders) {
        const tenders = JSON.parse(savedTenders)
        const updatedTender = tenders.find(t => t.id === parseInt(id))
        if (updatedTender) {
          // Simulate other users bidding
          simulateOtherUserBids(updatedTender)
          setTender(updatedTender)
          
          // Update live bidders list
          updateLiveBidders(updatedTender)
          
          // Add to recent bids
          if (updatedTender.biddingHistory && updatedTender.biddingHistory.length > 0) {
            const latestBid = updatedTender.biddingHistory[updatedTender.biddingHistory.length - 1]
            if (latestBid && !recentBids.find(bid => bid.id === latestBid.id)) {
              setRecentBids(prev => [latestBid, ...prev.slice(0, 4)])
              
              // Show notification for new bids
              if (latestBid.bidder !== user?.name) {
                showBidNotification(latestBid)
              }
            }
          }
        }
      }
    }, 2000) // Refresh every 2 seconds for more real-time feel

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [autoRefresh, isLive, id, user])

  // Simulate other users bidding
  const simulateOtherUserBids = (tender) => {
    if (Math.random() > 0.3) return // 30% chance of new bid

    const mockBidders = [
      'Green Earth Recycling', 'EcoWaste Solutions', 'Clean India Recyclers',
      'Sustainable Waste Management', 'Green Future Recycling', 'EcoTech Waste',
      'CleanCycle Solutions', 'GreenTech Recycling', 'EcoFriendly Waste',
      'Sustainable Solutions', 'GreenCycle Waste', 'EcoGreen Recycling'
    ]

    const bidderName = mockBidders[Math.floor(Math.random() * mockBidders.length)]
    const currentBid = tender.currentBid || tender.startingBid
    const bidAmount = currentBid + Math.floor(Math.random() * 5000) + 500

    // Create new bidder entry
    const newBidder = {
      userId: Math.floor(Math.random() * 1000) + 100,
      userName: bidderName,
      amount: bidAmount,
      timestamp: new Date().toISOString(),
      isLive: true
    }

    // Update tender
    const updatedTender = {
      ...tender,
      currentBid: bidAmount,
      bidders: [...(tender.bidders || []), newBidder],
      biddingHistory: [
        ...(tender.biddingHistory || []),
        {
          id: Date.now() + Math.random(),
          bidder: bidderName,
          amount: bidAmount,
          timestamp: new Date().toISOString(),
          type: 'bid'
        }
      ]
    }

    // Update localStorage
    const savedTenders = localStorage.getItem('wasteTenders')
    const tenders = JSON.parse(savedTenders)
    const updatedTenders = tenders.map(t => t.id === tender.id ? updatedTender : t)
    localStorage.setItem('wasteTenders', JSON.stringify(updatedTenders))
  }

  // Update live bidders list
  const updateLiveBidders = (tender) => {
    if (tender.bidders) {
      const sortedBidders = tender.bidders
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 10) // Show top 10 bidders
      setLiveBidders(sortedBidders)
    }
  }

  // Show bid notification
  const showBidNotification = (bid) => {
    const notification = {
      id: Date.now(),
      message: `${bid.bidder} placed a bid of ₹${bid.amount.toLocaleString()}`,
      type: 'bid',
      timestamp: new Date().toISOString()
    }
    
    setBidNotifications(prev => [notification, ...prev.slice(0, 4)])
    
    // Auto-remove notification after 5 seconds
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current)
    }
    
    notificationTimeoutRef.current = setTimeout(() => {
      setBidNotifications(prev => prev.filter(n => n.id !== notification.id))
    }, 5000)
  }

  // Handle incoming bids from WebSocket
  const handleIncomingBid = (data) => {
    if (data.bidder === user?.name) return // Don't show own bids

    // Update tender with new bid
    const savedTenders = localStorage.getItem('wasteTenders')
    if (savedTenders) {
      const tenders = JSON.parse(savedTenders)
      const updatedTenders = tenders.map(t => {
        if (t.id === parseInt(id)) {
          const newBidder = {
            userId: Math.floor(Math.random() * 1000) + 100,
            userName: data.bidder,
            amount: data.amount,
            timestamp: data.timestamp,
            isLive: true
          }

          return {
            ...t,
            currentBid: data.amount,
            bidders: [...(t.bidders || []), newBidder],
            biddingHistory: [
              ...(t.biddingHistory || []),
              {
                id: Date.now(),
                bidder: data.bidder,
                amount: data.amount,
                timestamp: data.timestamp,
                type: 'bid'
              }
            ]
          }
        }
        return t
      })

      localStorage.setItem('wasteTenders', JSON.stringify(updatedTenders))
      setTender(updatedTenders.find(t => t.id === parseInt(id)))
      updateLiveBidders(updatedTenders.find(t => t.id === parseInt(id)))
    }

    // Show notification
    showBidNotification(data)
  }

  // Handle user activity from WebSocket
  const handleUserActivity = (data) => {
    const activityNotification = {
      id: Date.now(),
      message: `${data.user} ${data.activity}`,
      type: 'activity',
      timestamp: data.timestamp
    }
    
    setBidNotifications(prev => [activityNotification, ...prev.slice(0, 4)])
  }

  // Handle chat messages from WebSocket
  const handleChatMessage = (data) => {
    // This would be handled by the MultiUserBiddingRoom component
    console.log('Chat message received:', data)
  }

  const handleBid = async () => {
    if (!bidAmount || bidAmount <= (tender.currentBid || tender.startingBid)) {
      setMessage('Bid amount must be higher than current bid')
      return
    }

    setIsBidding(true)
    setMessage('')

    try {
      // Simulate API call with network delay
      await new Promise(resolve => setTimeout(resolve, 1500))

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

          // Add to bidding history
          const historyEntry = {
            id: Date.now(),
            bidder: user.name,
            amount: parseInt(bidAmount),
            timestamp: new Date().toISOString(),
            type: 'bid'
          }

          const updatedTender = {
            ...t,
            currentBid: parseInt(bidAmount),
            bidders: updatedBidders,
            biddingHistory: [...(t.biddingHistory || []), historyEntry]
          }

          // Update live bidders immediately
          updateLiveBidders(updatedTender)
          
          // Add to recent bids
          setRecentBids(prev => [historyEntry, ...prev.slice(0, 4)])

          return updatedTender
        }
        return t
      })

      localStorage.setItem('wasteTenders', JSON.stringify(updatedTenders))
      setTender(updatedTenders.find(t => t.id === tender.id))
      setMessage('Bid placed successfully!')
      
      // Send bid to other users via WebSocket
      webSocketSimulator.send({
        type: 'bid_placed',
        bidder: user.name,
        amount: parseInt(bidAmount),
        timestamp: new Date().toISOString(),
        tenderId: tender.id
      })
      
      // Update bid amount for next bid
      setBidAmount(parseInt(bidAmount) + 100)
      
      // Show success notification
      const successNotification = {
        id: Date.now(),
        message: `Your bid of ₹${parseInt(bidAmount).toLocaleString()} has been placed!`,
        type: 'success',
        timestamp: new Date().toISOString()
      }
      setBidNotifications(prev => [successNotification, ...prev.slice(0, 4)])
      
    } catch (error) {
      setMessage('Failed to place bid. Please try again.')
      
      // Show error notification
      const errorNotification = {
        id: Date.now(),
        message: 'Failed to place bid. Please try again.',
        type: 'error',
        timestamp: new Date().toISOString()
      }
      setBidNotifications(prev => [errorNotification, ...prev.slice(0, 4)])
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
          <Link to="/dashboard" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
            Back to Dashboard
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
          <Link to="/dashboard" className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {isLive ? (
                <div className="flex items-center space-x-2 bg-red-100 text-red-800 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">LIVE</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                  <XCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">ENDED</span>
                </div>
              )}
            </div>
            
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
                autoRefresh 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {autoRefresh ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span className="text-sm">Auto-refresh</span>
            </button>
            
            <button
              onClick={() => setShowSimulator(!showSimulator)}
              className="flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors bg-blue-100 text-blue-800 hover:bg-blue-200"
            >
              <Settings className="h-4 w-4" />
              <span className="text-sm">Simulator</span>
            </button>
            
            <button
              onClick={() => setShowBiddingRoom(!showBiddingRoom)}
              className="flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors bg-purple-100 text-purple-800 hover:bg-purple-200"
            >
              <Users className="h-4 w-4" />
              <span className="text-sm">Bidding Room</span>
            </button>
            
            {/* Connection Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-600">{connectionStatus}</span>
            </div>
          </div>
        </div>

        {/* Live Notifications */}
        {bidNotifications.length > 0 && (
          <div className="mb-6">
            <div className="bg-white/90 backdrop-blur-sm border border-green-200 shadow-lg rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-green-600" />
                  <span>Live Notifications</span>
                </h3>
                <button
                  onClick={() => setBidNotifications([])}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {bidNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border-l-4 ${
                      notification.type === 'success' 
                        ? 'bg-green-50 border-green-400 text-green-800'
                        : notification.type === 'error'
                        ? 'bg-red-50 border-red-400 text-red-800'
                        : 'bg-blue-50 border-blue-400 text-blue-800'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4" />
                      <span className="text-sm font-medium">{notification.message}</span>
                      <span className="text-xs text-gray-500 ml-auto">
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Multi-User Bidding Room */}
        {showBiddingRoom && (
          <div className="mb-8">
            <MultiUserBiddingRoom 
              tenderId={parseInt(id)} 
              currentUser={user}
              onBidUpdate={(updatedTender) => setTender(updatedTender)}
            />
          </div>
        )}

        {/* Simulator */}
        {showSimulator && (
          <div className="mb-8">
            <RealTimeBiddingSimulator 
              tenderId={parseInt(id)} 
              onBidUpdate={(updatedTender) => setTender(updatedTender)}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Bidding Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tender Info */}
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
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-600">{tender.quantity} tonnes</span>
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
                  <span className={isLive ? 'text-red-600 font-medium' : 'text-gray-500'}>
                    {timeRemaining}
                  </span>
                </div>
              </div>
            </div>

            {/* Live Bidding Interface */}
            {isLive && (
              <div className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Place Your Bid</h2>
                
                {isUserBidding && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
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
                        <span>Place Live Bid</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Bidding History */}
            <div className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Live Bidding Activity</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {tender.biddingHistory?.slice(-10).reverse().map((entry, index) => (
                  <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{entry.bidder}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(entry.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">₹{entry.amount}</p>
                      <p className="text-xs text-gray-500">Bid placed</p>
                    </div>
                  </div>
                ))}
                {(!tender.biddingHistory || tender.biddingHistory.length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p>No bidding activity yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Bidders */}
            <div className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <span>Live Bidders</span>
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">{liveBidders.length} active</span>
                </div>
              </div>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {liveBidders.map((bidder, index) => (
                  <div key={bidder.userId} className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                    bidder.userId === user?.id 
                      ? 'bg-green-50 border border-green-200 shadow-sm' 
                      : 'bg-gray-50 hover:bg-gray-100'
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
                          {bidder.userId === user?.id && ' (You)'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(bidder.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">₹{bidder.amount.toLocaleString()}</p>
                      {index === 0 && (
                        <p className="text-xs text-yellow-600 font-medium">Leading</p>
                      )}
                    </div>
                  </div>
                ))}
                {liveBidders.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p>No active bidders</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Bids */}
            <div className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Activity className="h-5 w-5 text-green-600" />
                <span>Recent Activity</span>
              </h3>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {recentBids.map((bid, index) => (
                  <div key={bid.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{bid.bidder}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(bid.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">₹{bid.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Bid placed</p>
                    </div>
                  </div>
                ))}
                {recentBids.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    <Activity className="h-6 w-6 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No recent activity</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Bidding Stats</h3>
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
                  <span className="text-gray-600">Time Remaining</span>
                  <span className={`font-semibold ${isLive ? 'text-red-600' : 'text-gray-500'}`}>
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

export default LiveBidding
