// Mock data generator for Clean India Solid Waste Bidding Platform

const wasteTypes = ['organic', 'industrial', 'municipal', 'recyclable']
const locations = [
  'Mumbai, Maharashtra', 'Delhi, NCR', 'Bangalore, Karnataka', 'Chennai, Tamil Nadu',
  'Kolkata, West Bengal', 'Pune, Maharashtra', 'Hyderabad, Telangana', 'Ahmedabad, Gujarat',
  'Jaipur, Rajasthan', 'Lucknow, Uttar Pradesh', 'Bhopal, Madhya Pradesh', 'Chandigarh, Punjab'
]

const wasteDescriptions = {
  organic: [
    'Food waste from restaurants and households',
    'Garden waste and agricultural residues',
    'Biodegradable kitchen waste',
    'Organic compost materials',
    'Vegetable and fruit waste from markets'
  ],
  industrial: [
    'Manufacturing waste from textile industry',
    'Construction and demolition debris',
    'Metal scraps from industrial units',
    'Chemical waste containers (empty)',
    'Plastic waste from packaging industry'
  ],
  municipal: [
    'Household waste collection',
    'Street cleaning waste',
    'Public area waste collection',
    'Mixed municipal solid waste',
    'Waste from commercial establishments'
  ],
  recyclable: [
    'Paper and cardboard waste',
    'Plastic bottles and containers',
    'Metal cans and aluminum waste',
    'Glass bottles and jars',
    'Electronic waste components'
  ]
}

const userNames = [
  'Rajesh Kumar', 'Priya Sharma', 'Amit Patel', 'Sunita Singh', 'Vikram Gupta',
  'Anita Reddy', 'Suresh Yadav', 'Kavita Joshi', 'Ravi Verma', 'Meera Iyer',
  'Arjun Nair', 'Deepika Agarwal', 'Rohit Jain', 'Sneha Desai', 'Kiran Rao'
]

const generateRandomDate = (daysFromNow) => {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  return date.toISOString()
}

const generateRandomTime = () => {
  const hours = Math.floor(Math.random() * 12) + 8 // 8 AM to 8 PM
  const minutes = Math.floor(Math.random() * 60)
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

const generateBidders = (count) => {
  const bidders = []
  for (let i = 0; i < count; i++) {
    const bidder = {
      userId: Math.floor(Math.random() * 1000) + 1,
      userName: userNames[Math.floor(Math.random() * userNames.length)],
      amount: Math.floor(Math.random() * 50000) + 10000,
      timestamp: generateRandomDate(-Math.floor(Math.random() * 7)),
      isLive: Math.random() > 0.3
    }
    bidders.push(bidder)
  }
  return bidders.sort((a, b) => b.amount - a.amount)
}

const generateBiddingHistory = (bidders) => {
  return bidders.map(bidder => ({
    id: Math.floor(Math.random() * 10000),
    bidder: bidder.userName,
    amount: bidder.amount,
    timestamp: bidder.timestamp,
    type: 'bid'
  }))
}

export const generateMockWasteTenders = (count = 20) => {
  const tenders = []
  
  for (let i = 0; i < count; i++) {
    const wasteType = wasteTypes[Math.floor(Math.random() * wasteTypes.length)]
    const description = wasteDescriptions[wasteType][Math.floor(Math.random() * wasteDescriptions[wasteType].length)]
    const location = locations[Math.floor(Math.random() * locations.length)]
    const quantity = Math.floor(Math.random() * 100) + 10 // 10-110 tonnes
    const startingBid = Math.floor(Math.random() * 100000) + 50000 // ₹50k-150k
    const biddersCount = Math.floor(Math.random() * 8) + 1 // 1-8 bidders
    const bidders = generateBidders(biddersCount)
    const currentBid = bidders.length > 0 ? bidders[0].amount : startingBid
    const biddingHistory = generateBiddingHistory(bidders)
    
    const tender = {
      id: i + 1,
      description,
      wasteType,
      quantity,
      startingBid,
      currentBid,
      location,
      deadline: generateRandomDate(Math.floor(Math.random() * 30) + 1), // 1-30 days from now
      collectionDate: generateRandomDate(Math.floor(Math.random() * 60) + 30), // 30-90 days from now
      status: Math.random() > 0.2 ? 'active' : 'completed', // 80% active
      bidders,
      biddingHistory,
      createdAt: generateRandomDate(-Math.floor(Math.random() * 30)),
      specialInstructions: Math.random() > 0.5 ? 'Special handling required. Contact before collection.' : '',
      municipality: {
        name: `Municipality of ${location.split(',')[0]}`,
        contact: `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        email: `admin@${location.split(',')[0].toLowerCase().replace(' ', '')}.gov.in`
      }
    }
    
    tenders.push(tender)
  }
  
  return tenders
}

export const generateMockUsers = (count = 50) => {
  const users = []
  const roles = ['admin', 'user']
  
  for (let i = 0; i < count; i++) {
    const role = i < 5 ? 'admin' : 'user' // First 5 are admins
    const user = {
      id: i + 1,
      name: userNames[Math.floor(Math.random() * userNames.length)],
      email: `user${i + 1}@example.com`,
      role,
      phone: `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      joinedAt: generateRandomDate(-Math.floor(Math.random() * 365)),
      isVerified: Math.random() > 0.1, // 90% verified
      totalBids: Math.floor(Math.random() * 50),
      wonBids: Math.floor(Math.random() * 10),
      rating: (Math.random() * 2 + 3).toFixed(1) // 3.0-5.0 rating
    }
    users.push(user)
  }
  
  return users
}

export const generateMockNotifications = (userId, count = 10) => {
  const notifications = []
  const types = ['bid_placed', 'bid_won', 'bid_lost', 'tender_created', 'tender_ended']
  const messages = {
    bid_placed: 'Your bid has been placed successfully',
    bid_won: 'Congratulations! You won the tender',
    bid_lost: 'Your bid was outbid by another user',
    tender_created: 'A new tender has been created in your area',
    tender_ended: 'A tender you were bidding on has ended'
  }
  
  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)]
    const notification = {
      id: i + 1,
      userId,
      type,
      message: messages[type],
      isRead: Math.random() > 0.3, // 70% read
      createdAt: generateRandomDate(-Math.floor(Math.random() * 7)),
      tenderId: Math.floor(Math.random() * 20) + 1
    }
    notifications.push(notification)
  }
  
  return notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export const generateMockAnalytics = () => {
  return {
    totalTenders: 156,
    activeTenders: 89,
    completedTenders: 67,
    totalWaste: 12500, // tonnes
    totalRevenue: 25000000, // ₹25M
    totalUsers: 1250,
    municipalities: 45,
    recyclers: 1205,
    wasteByType: {
      organic: 4500,
      industrial: 3200,
      municipal: 2800,
      recyclable: 2000
    },
    monthlyStats: [
      { month: 'Jan', tenders: 12, waste: 850, revenue: 2100000 },
      { month: 'Feb', tenders: 15, waste: 920, revenue: 2300000 },
      { month: 'Mar', tenders: 18, waste: 1100, revenue: 2800000 },
      { month: 'Apr', tenders: 22, waste: 1250, revenue: 3100000 },
      { month: 'May', tenders: 25, waste: 1400, revenue: 3500000 },
      { month: 'Jun', tenders: 28, waste: 1600, revenue: 4000000 }
    ],
    topMunicipalities: [
      { name: 'Mumbai Municipal Corporation', tenders: 45, waste: 2500 },
      { name: 'Delhi Municipal Corporation', tenders: 38, waste: 2200 },
      { name: 'Bangalore Municipal Corporation', tenders: 32, waste: 1800 },
      { name: 'Chennai Municipal Corporation', tenders: 28, waste: 1600 },
      { name: 'Pune Municipal Corporation', tenders: 25, waste: 1400 }
    ],
    topRecyclers: [
      { name: 'Green Earth Recycling', bids: 125, won: 45, rating: 4.8 },
      { name: 'EcoWaste Solutions', bids: 98, won: 38, rating: 4.7 },
      { name: 'Clean India Recyclers', bids: 87, won: 32, rating: 4.6 },
      { name: 'Sustainable Waste Management', bids: 76, won: 28, rating: 4.5 },
      { name: 'Green Future Recycling', bids: 65, won: 25, rating: 4.4 }
    ]
  }
}

// Initialize mock data
export const initializeMockData = () => {
  // Generate and store mock data in localStorage
  const wasteTenders = generateMockWasteTenders(25)
  const users = generateMockUsers(100)
  const analytics = generateMockAnalytics()
  
  localStorage.setItem('wasteTenders', JSON.stringify(wasteTenders))
  localStorage.setItem('mockUsers', JSON.stringify(users))
  localStorage.setItem('analytics', JSON.stringify(analytics))
  
  // Set user counts
  localStorage.setItem('recyclerCount', '1205')
  localStorage.setItem('municipalityCount', '45')
  
  return {
    wasteTenders,
    users,
    analytics
  }
}

export default {
  generateMockWasteTenders,
  generateMockUsers,
  generateMockNotifications,
  generateMockAnalytics,
  initializeMockData
}
