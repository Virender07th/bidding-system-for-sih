// WebSocket Simulator for Multi-User Live Bidding
class WebSocketSimulator {
  constructor() {
    this.listeners = new Map()
    this.isConnected = false
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 5
    this.reconnectInterval = 3000
    this.heartbeatInterval = null
  }

  connect() {
    this.isConnected = true
    this.reconnectAttempts = 0
    
    // Simulate connection delay
    setTimeout(() => {
      this.emit('open')
      this.startHeartbeat()
      this.simulateIncomingData()
    }, 1000)
  }

  disconnect() {
    this.isConnected = false
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
    }
    this.emit('close')
  }

  send(data) {
    if (!this.isConnected) {
      console.warn('WebSocket not connected')
      return false
    }

    // Simulate network delay
    setTimeout(() => {
      this.emit('message', { data: JSON.stringify(data) })
    }, Math.random() * 500 + 100)

    return true
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event).push(callback)
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event)
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        try {
          callback(data)
        } catch (error) {
          console.error('WebSocket callback error:', error)
        }
      })
    }
  }

  startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      if (this.isConnected) {
        this.emit('ping')
      }
    }, 30000) // 30 seconds
  }

  simulateIncomingData() {
    if (!this.isConnected) return

    // Simulate random bidding activity
    const simulateBid = () => {
      const mockBidders = [
        'Green Earth Recycling', 'EcoWaste Solutions', 'Clean India Recyclers',
        'Sustainable Waste Management', 'Green Future Recycling', 'EcoTech Waste',
        'CleanCycle Solutions', 'GreenTech Recycling', 'EcoFriendly Waste',
        'Sustainable Solutions', 'GreenCycle Waste', 'EcoGreen Recycling'
      ]

      const bidder = mockBidders[Math.floor(Math.random() * mockBidders.length)]
      const amount = Math.floor(Math.random() * 50000) + 50000

      this.emit('message', {
        data: JSON.stringify({
          type: 'bid_placed',
          bidder,
          amount,
          timestamp: new Date().toISOString(),
          tenderId: this.currentTenderId
        })
      })
    }

    // Simulate user activity
    const simulateActivity = () => {
      const activities = [
        'joined the bidding room',
        'is viewing the tender',
        'is preparing a bid',
        'is analyzing the competition',
        'is reviewing tender details'
      ]

      const activity = activities[Math.floor(Math.random() * activities.length)]
      const users = [
        'Green Earth Recycling', 'EcoWaste Solutions', 'Clean India Recyclers',
        'Sustainable Waste Management', 'Green Future Recycling'
      ]

      this.emit('message', {
        data: JSON.stringify({
          type: 'user_activity',
          user: users[Math.floor(Math.random() * users.length)],
          activity,
          timestamp: new Date().toISOString()
        })
      })
    }

    // Simulate chat messages
    const simulateChat = () => {
      const messages = [
        'Good luck everyone!',
        'This is a competitive tender',
        'Let the best recycler win',
        'Great opportunity for waste management',
        'Excited to participate',
        'May the best bid win!',
        'Clean India mission!',
        'Sustainable future ahead'
      ]

      const users = [
        'Green Earth Recycling', 'EcoWaste Solutions', 'Clean India Recyclers',
        'Sustainable Waste Management', 'Green Future Recycling'
      ]

      this.emit('message', {
        data: JSON.stringify({
          type: 'chat_message',
          user: users[Math.floor(Math.random() * users.length)],
          message: messages[Math.floor(Math.random() * messages.length)],
          timestamp: new Date().toISOString()
        })
      })
    }

    // Randomly trigger events
    const triggerEvent = () => {
      const eventType = Math.random()
      
      if (eventType < 0.4) {
        simulateBid()
      } else if (eventType < 0.7) {
        simulateActivity()
      } else {
        simulateChat()
      }

      // Schedule next event
      const nextEventDelay = Math.random() * 10000 + 5000 // 5-15 seconds
      setTimeout(triggerEvent, nextEventDelay)
    }

    // Start the simulation
    setTimeout(triggerEvent, 2000)
  }

  setCurrentTender(tenderId) {
    this.currentTenderId = tenderId
  }
}

// Create singleton instance
const webSocketSimulator = new WebSocketSimulator()

export default webSocketSimulator
