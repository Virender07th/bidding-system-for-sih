import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { 
  LogOut, User, Settings, Leaf, Recycle, Menu, X, 
  BarChart3, Trash2, Home, Bell, HelpCircle, ChevronDown 
} from 'lucide-react'

const Header = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const location = useLocation()
  const userMenuRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const isActive = (path) => location.pathname === path

  const navItems = [
    { path: '/dashboard', label: 'Waste Dashboard', icon: BarChart3, show: true },
    { path: '/bids', label: 'Browse Tenders', icon: Trash2, show: true },
    { path: '/admin', label: 'Admin Panel', icon: Settings, show: user?.role === 'admin' },
    { path: '/user', label: 'My Profile', icon: User, show: user?.role === 'user' }
  ]

  return (
    <header className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="flex items-center space-x-2">
              <div className="bg-green-100/20 p-2 rounded-full group-hover:bg-green-100/30 transition-colors">
                <Recycle className="h-8 w-8 text-green-200" />
              </div>
              <Leaf className="h-6 w-6 text-green-300 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white group-hover:text-green-100 transition-colors">
                Clean India
              </h1>
              <p className="text-green-100 text-sm group-hover:text-green-200 transition-colors">
                Solid Waste Bidding
              </p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          {user && (
            <nav className="hidden lg:flex items-center space-x-2">
              {navItems.filter(item => item.show).map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white hover:text-green-200 hover:bg-white/10'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              
              {/* Notifications */}
              <button className="relative p-2 text-white hover:text-green-200 hover:bg-white/10 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Help */}
              <Link
                to="/help"
                className="p-2 text-white hover:text-green-200 hover:bg-white/10 rounded-lg transition-colors"
              >
                <HelpCircle className="h-5 w-5" />
              </Link>
            </nav>
          )}

          {/* User Section */}
          {user ? (
            <div className="flex items-center space-x-4">
              {/* User Info & Dropdown */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-white font-medium text-sm">{user.name}</p>
                    <p className="text-green-200 text-xs">
                      {user.role === 'admin' ? 'Municipality Admin' : 'Recycler/Buyer'}
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-green-200" />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>Profile Settings</span>
                      </Link>
                      <Link
                        to="/notifications"
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Bell className="h-4 w-4" />
                        <span>Notifications</span>
                      </Link>
                      <Link
                        to="/help"
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <HelpCircle className="h-4 w-4" />
                        <span>Help & Support</span>
                      </Link>
                    </div>
                    <div className="border-t border-gray-200 py-2">
                      <button
                        onClick={() => {
                          onLogout()
                          setIsUserMenuOpen(false)
                        }}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-white hover:text-green-200 hover:bg-white/10 rounded-lg transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
              >
                Sign In
              </Link>
              <Link
                to="/login"
                className="bg-white text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && user && (
          <div className="lg:hidden border-t border-green-400 py-4">
            <nav className="flex flex-col space-y-2">
              {navItems.filter(item => item.show).map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-white/20 text-white'
                      : 'text-white hover:text-green-200 hover:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              
              <div className="border-t border-green-400 pt-4 mt-4">
                <Link
                  to="/notifications"
                  className="flex items-center space-x-3 px-4 py-3 text-white hover:text-green-200 hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </Link>
                <Link
                  to="/help"
                  className="flex items-center space-x-3 px-4 py-3 text-white hover:text-green-200 hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <HelpCircle className="h-5 w-5" />
                  <span>Help & Support</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
