import { useState, useEffect, useRef } from 'react'
import { 
  Users, MessageCircle, Activity, Bell, Zap, Target, 
  Trophy, TrendingUp, Clock, DollarSign, Star, Award
} from 'lucide-react'

const MultiUserBiddingRoom = ({ tenderId, currentUser, onBidUpdate }) => {
  const [activeUsers, setActiveUsers] = useState([])
  const [liveChat, setLiveChat] = useState([])
  const [chatMessage, setChatMessage] = useState('')
  const [biddingActivity, setBiddingActivity] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [typingUsers, setTypingUsers] = useState([])
  const chatRef = useRef(null)
  const typingTimeoutRef = useRef(null)

  // Simulate active users
  useEffect(() => {
    const mockUsers = [
      { id: 1, name: 'Green Earth Recycling', avatar: '🌱', isOnline: true },
      { id: 2, name: 'EcoWaste Solutions', avatar: '♻️', isOnline: true },
      { id: 3, name: 'Clean India Recyclers', avatar: '🏭', isOnline: true },
      { id: 4, name: 'Sustainable Waste Management', avatar: '🌿', isOnline: true },
      { id: 5, name: 'Green Future Recycling', avatar: '🌳', isOnline: true },
      { id: 6, name: 'EcoTech Waste', avatar: '⚡', isOnline: true },
      { id: 7, name: 'CleanCycle Solutions', avatar: '🔄', isOnline: true },
      { id: 8, name: 'GreenTech Recycling', avatar: '🔧', isOnline: true }
    ]

    setActiveUsers(mockUsers)

    // Simulate user activity
    const activityInterval = setInterval(() => {
      const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)]
      const activities = [
        'joined the bidding room',
        'is viewing the tender',
        'is preparing a bid',
        'is analyzing the competition',
        'is reviewing tender details'
      ]
      
      const activity = activities[Math.floor(Math.random() * activities.length)]
      
      setBiddingActivity(prev => [{
        id: Date.now(),
        user: randomUser.name,
        action: activity,
        timestamp: new Date().toISOString(),
        type: 'activity'
      }, ...prev.slice(0, 9)])
    }, 5000)

    return () => clearInterval(activityInterval)
  }, [])

  // Auto-scroll chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [liveChat])

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return

    const newMessage = {
      id: Date.now(),
      user: currentUser.name,
      message: chatMessage,
      timestamp: new Date().toISOString(),
      type: 'message'
    }

    setLiveChat(prev => [...prev, newMessage])
    setChatMessage('')
    setIsTyping(false)
  }

  const handleTyping = () => {
    setIsTyping(true)
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false)
    }, 1000)
  }

  const getActivityIcon = (type) => {
    switch(type) {
      case 'bid': return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'join': return <Users className="h-4 w-4 text-blue-600" />
      case 'message': return <MessageCircle className="h-4 w-4 text-purple-600" />
      default: return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-green-200 shadow-lg rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
          <Users className="h-6 w-6 text-green-600" />
          <span>Live Bidding Room</span>
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-600 font-medium">{activeUsers.length} online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Users */}
        <div className="lg:col-span-1">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Users className="h-5 w-5 text-green-600" />
            <span>Active Bidders</span>
          </h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {activeUsers.map((user) => (
              <div key={user.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-lg">
                  {user.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className="text-sm text-gray-500">
                      {user.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
                {user.id === currentUser?.id && (
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    You
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Live Chat */}
        <div className="lg:col-span-1">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-green-600" />
            <span>Live Chat</span>
          </h4>
          <div className="bg-gray-50 rounded-lg p-4 h-64 flex flex-col">
            <div 
              ref={chatRef}
              className="flex-1 overflow-y-auto space-y-3 mb-4"
            >
              {liveChat.map((message) => (
                <div key={message.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{message.user}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm mt-1">{message.message}</p>
                  </div>
                </div>
              ))}
              {liveChat.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No messages yet</p>
                </div>
              )}
            </div>
            
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => {
                  setChatMessage(e.target.value)
                  handleTyping()
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Live Activity */}
        <div className="lg:col-span-1">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Activity className="h-5 w-5 text-green-600" />
            <span>Live Activity</span>
          </h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {biddingActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {biddingActivity.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <Activity className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No recent activity</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Bell className="h-4 w-4" />
              <span>Notifications: On</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Zap className="h-4 w-4" />
              <span>Auto-refresh: 2s</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Target className="h-4 w-4" />
              <span>Competition: High</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600 font-medium">Live</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MultiUserBiddingRoom
