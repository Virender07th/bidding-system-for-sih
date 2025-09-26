import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Play, Pause, RotateCcw, Settings, Trophy, Users, Clock, 
  DollarSign, TrendingUp, Bell, ArrowRight, Star, Zap
} from 'lucide-react'

const LiveBiddingDemo = () => {
  const [isDemoRunning, setIsDemoRunning] = useState(false)
  const [demoStep, setDemoStep] = useState(0)
  const [currentBid, setCurrentBid] = useState(75000)
  const [bidderCount, setBidderCount] = useState(3)
  const [timeRemaining, setTimeRemaining] = useState('2h 15m 30s')

  const demoSteps = [
    {
      title: 'Live Bidding Started',
      description: 'Municipality has opened live bidding for organic waste collection',
      bidder: 'Green Earth Recycling',
      amount: 75000,
      time: '2h 15m 30s'
    },
    {
      title: 'New Bid Placed',
      description: 'EcoWaste Solutions placed a higher bid',
      bidder: 'EcoWaste Solutions',
      amount: 78000,
      time: '2h 14m 45s'
    },
    {
      title: 'Competitive Bidding',
      description: 'Clean India Recyclers joined the bidding',
      bidder: 'Clean India Recyclers',
      amount: 82000,
      time: '2h 13m 20s'
    },
    {
      title: 'High Competition',
      description: 'Multiple recyclers are actively bidding',
      bidder: 'Sustainable Waste Management',
      amount: 85000,
      time: '2h 12m 10s'
    },
    {
      title: 'Final Moments',
      description: 'Bidding is heating up in the final minutes',
      bidder: 'Green Future Recycling',
      amount: 92000,
      time: '0h 2m 15s'
    }
  ]

  useEffect(() => {
    if (!isDemoRunning) return

    const interval = setInterval(() => {
      setDemoStep(prev => {
        if (prev >= demoSteps.length - 1) {
          setIsDemoRunning(false)
          return 0
        }
        return prev + 1
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [isDemoRunning])

  useEffect(() => {
    if (demoStep < demoSteps.length) {
      setCurrentBid(demoSteps[demoStep].amount)
      setBidderCount(3 + demoStep)
      setTimeRemaining(demoSteps[demoStep].time)
    }
  }, [demoStep])

  const startDemo = () => {
    setIsDemoRunning(true)
    setDemoStep(0)
  }

  const stopDemo = () => {
    setIsDemoRunning(false)
    setDemoStep(0)
  }

  const resetDemo = () => {
    setIsDemoRunning(false)
    setDemoStep(0)
    setCurrentBid(75000)
    setBidderCount(3)
    setTimeRemaining('2h 15m 30s')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Zap className="h-8 w-8 text-green-600" />
            <h1 className="text-4xl font-bold text-green-800">Live Bidding Demo</h1>
          </div>
          <p className="text-xl text-green-600 max-w-3xl mx-auto">
            Experience real-time bidding for solid waste management. Watch as recyclers compete 
            for waste collection contracts in a transparent, competitive environment.
          </p>
        </div>

        {/* Demo Controls */}
        <div className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-bold text-gray-900">Interactive Demo</h2>
              <div className="flex items-center space-x-2">
                {isDemoRunning ? (
                  <div className="flex items-center space-x-2 bg-red-100 text-red-800 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">LIVE</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-sm font-medium">PAUSED</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={startDemo}
                disabled={isDemoRunning}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Play className="h-4 w-4" />
                <span>Start Demo</span>
              </button>
              
              <button
                onClick={stopDemo}
                disabled={!isDemoRunning}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Pause className="h-4 w-4" />
                <span>Stop Demo</span>
              </button>
              
              <button
                onClick={resetDemo}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Bidding Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tender Card */}
            <div className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg rounded-xl p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Trophy className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Organic Waste Collection</h3>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Organic
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-600">50 tonnes</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">
                    ₹{currentBid.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Current Bid</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span>{bidderCount} bidders</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-red-600 font-medium">{timeRemaining}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span>Starting: ₹50,000</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-gray-400" />
                  <span>+₹{currentBid - 50000}</span>
                </div>
              </div>
            </div>

            {/* Live Activity Feed */}
            <div className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Live Bidding Activity</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {demoSteps.slice(0, demoStep + 1).map((step, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg transition-all duration-500 ${
                    index === demoStep ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === demoStep ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{step.bidder}</p>
                        <p className="text-sm text-gray-500">{step.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">₹{step.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Bidders */}
            <div className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Current Bidders</h3>
              <div className="space-y-3">
                {[
                  { name: 'Green Earth Recycling', amount: 92000, isLeading: true },
                  { name: 'EcoWaste Solutions', amount: 89000, isLeading: false },
                  { name: 'Clean India Recyclers', amount: 85000, isLeading: false }
                ].map((bidder, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                    bidder.isLeading ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        bidder.isLeading ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {bidder.isLeading ? <Trophy className="h-4 w-4" /> : <span className="text-sm font-bold">{index + 1}</span>}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{bidder.name}</p>
                        <p className="text-sm text-gray-500">Just now</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">₹{bidder.amount.toLocaleString()}</p>
                      {bidder.isLeading && (
                        <p className="text-xs text-yellow-600 font-medium">Leading</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Live Bidding Features</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Real-time notifications</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Live countdown timer</span>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Bid tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Competitor analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Trophy className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Winner tracking</span>
                </div>
              </div>
            </div>

            {/* Try Live Bidding */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2">Try Live Bidding</h3>
              <p className="text-green-100 text-sm mb-4">
                Experience real-time bidding for solid waste management contracts.
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center space-x-2 bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors"
              >
                <span>Start Bidding</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Live Bidding?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Transparent Process</h3>
              <p className="text-gray-600">
                All bids are visible in real-time, ensuring complete transparency in the bidding process.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Competitive Pricing</h3>
              <p className="text-gray-600">
                Live bidding ensures the best market price for waste management services.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Quality Assurance</h3>
              <p className="text-gray-600">
                Only verified recyclers can participate, ensuring quality waste management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveBiddingDemo
