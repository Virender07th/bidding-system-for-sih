import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Breadcrumb from './components/Breadcrumb'
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'
import UserDashboard from './components/UserDashboard'
import BidList from './components/BidList'
import BidInterface from './components/BidInterface'
import LandingPage from './components/LandingPage'
import SolidWasteDashboard from './components/SolidWasteDashboard'
import LiveBidding from './components/LiveBidding'
import LiveBiddingDemo from './components/LiveBiddingDemo'
import DataInitializer from './components/DataInitializer'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('biddingUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('biddingUser', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('biddingUser')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-600 font-medium">Loading Clean India Platform...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <DataInitializer />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 leaf-pattern">
        <Header user={user} onLogout={handleLogout} />
        {user && <Breadcrumb />}
        <main className="min-h-screen">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/user'} /> : <LandingPage />} 
            />
            <Route 
              path="/login" 
              element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/user'} /> : <Login onLogin={handleLogin} />} 
            />
            <Route 
              path="/admin" 
              element={user && user.role === 'admin' ? <AdminDashboard user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/user" 
              element={user && user.role === 'user' ? <UserDashboard user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/dashboard" 
              element={ user && user.role === 'admin' ? <SolidWasteDashboard/> : <Navigate to="/login" />} 
            />
            <Route 
              path="/bids" 
              element={ user && user.role === 'user' ? <BidList  /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/bid/:id" 
              element={ user && user.role === 'user' ? <BidInterface/> : <Navigate to="/login" />} 
            />
            <Route 
              path="/live-bid/:id" 
              element={ user && user.role === 'admin' ? <LiveBidding/> : <Navigate to="/login" />} 
            />
            <Route 
              path="/demo" 
              element={<LiveBiddingDemo />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
