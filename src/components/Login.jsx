import { useState } from 'react'
import { User, Lock, Shield, Users, Recycle, Leaf } from 'lucide-react'

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user'
  })
  const [isRegistering, setIsRegistering] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simple authentication logic (in real app, this would connect to backend)
    if (formData.email && formData.password) {
      const userData = {
        id: Date.now(),
        name: formData.email.split('@')[0],
        email: formData.email,
        role: formData.role
      }
      onLogin(userData)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="clean-india-card rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Recycle className="h-8 w-8 text-green-600" />
              </div>
              <Leaf className="h-6 w-6 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {isRegistering ? 'Join Clean India' : 'Welcome Back'}
            </h2>
            <p className="mt-2 text-green-600 font-medium">
              Sustainable Waste Management Platform
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Your Role
              </label>
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-300 transition-colors">
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={formData.role === 'user'}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <div className="ml-3 flex items-center space-x-3">
                    <Users className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Recycler/Buyer</p>
                      <p className="text-xs text-gray-500">Participate in waste bidding</p>
                    </div>
                  </div>
                </label>
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-300 transition-colors">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={formData.role === 'admin'}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <div className="ml-3 flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Municipality Admin</p>
                      <p className="text-xs text-gray-500">Manage waste tenders</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full green-india-button flex items-center justify-center space-x-2"
            >
              <span>{isRegistering ? 'Join Clean India' : 'Login to Platform'}</span>
              <Leaf className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isRegistering ? 'Already have an account?' : "Don't have an account?"}
              <button 
                type="button" 
                className="ml-2 text-green-600 hover:text-green-700 font-medium transition-colors"
                onClick={() => setIsRegistering(!isRegistering)}
              >
                {isRegistering ? 'Login here' : 'Register here'}
              </button>
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-green-700 font-medium">
            🌱 Contributing to a Cleaner, Greener India
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
