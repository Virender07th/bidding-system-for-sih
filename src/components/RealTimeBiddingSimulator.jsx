import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, Settings } from 'lucide-react'

const RealTimeBiddingSimulator = ({ tenderId, onBidUpdate }) => {
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationSpeed, setSimulationSpeed] = useState(5000) // 5 seconds
  const [autoBidAmount, setAutoBidAmount] = useState(1000)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const mockBidders = [
    'Green Earth Recycling', 'EcoWaste Solutions', 'Clean India Recyclers',
    'Sustainable Waste Management', 'Green Future Recycling', 'EcoTech Waste',
    'CleanCycle Solutions', 'GreenTech Recycling', 'EcoFriendly Waste',
    'Sustainable Solutions', 'GreenCycle Waste', 'EcoGreen Recycling'
  ]

  const simulateBid = () => {
    const savedTenders = localStorage.getItem('wasteTenders')
    if (!savedTenders) return

    const tenders = JSON.parse(savedTenders)
    const tender = tenders.find(t => t.id === tenderId)
    if (!tender) return

    // Generate random bid
    const bidderName = mockBidders[Math.floor(Math.random() * mockBidders.length)]
    const currentBid = tender.currentBid || tender.startingBid
    const bidAmount = currentBid + Math.floor(Math.random() * autoBidAmount) + 100

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
          id: Date.now(),
          bidder: bidderName,
          amount: bidAmount,
          timestamp: new Date().toISOString(),
          type: 'bid'
        }
      ]
    }

    // Update localStorage
    const updatedTenders = tenders.map(t => t.id === tenderId ? updatedTender : t)
    localStorage.setItem('wasteTenders', JSON.stringify(updatedTenders))

    // Notify parent component
    if (onBidUpdate) {
      onBidUpdate(updatedTender)
    }
  }

  useEffect(() => {
    if (!isSimulating) return

    const interval = setInterval(simulateBid, simulationSpeed)
    return () => clearInterval(interval)
  }, [isSimulating, simulationSpeed, tenderId, autoBidAmount])

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-green-200 rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Live Bidding Simulator</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              isSimulating 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {isSimulating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{isSimulating ? 'Stop' : 'Start'} Simulation</span>
          </button>
          
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isSettingsOpen && (
        <div className="border-t border-gray-200 pt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Simulation Speed (seconds)
            </label>
            <select
              value={simulationSpeed / 1000}
              onChange={(e) => setSimulationSpeed(parseInt(e.target.value) * 1000)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="2">2 seconds</option>
              <option value="3">3 seconds</option>
              <option value="5">5 seconds</option>
              <option value="10">10 seconds</option>
              <option value="15">15 seconds</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Bid Increment (₹)
            </label>
            <input
              type="number"
              value={autoBidAmount}
              onChange={(e) => setAutoBidAmount(parseInt(e.target.value))}
              min="100"
              max="10000"
              step="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
      )}

      <div className="text-sm text-gray-600">
        {isSimulating ? (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Simulating live bids every {simulationSpeed / 1000} seconds</span>
          </div>
        ) : (
          <span>Click "Start Simulation" to begin live bidding simulation</span>
        )}
      </div>
    </div>
  )
}

export default RealTimeBiddingSimulator
