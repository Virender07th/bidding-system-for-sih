import { Link } from 'react-router-dom'
import { Recycle, Leaf, TreePine, Users, Award, ArrowRight, Trash2, Factory, Truck, Shield, TrendingUp, Clock, DollarSign, Zap } from 'lucide-react'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 leaf-pattern">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-4 mb-8">
              <div className="bg-green-100 p-4 rounded-full shadow-lg">
                <Recycle className="h-12 w-12 text-green-600" />
              </div>
              <Leaf className="h-8 w-8 text-green-500 animate-pulse" />
              <TreePine className="h-8 w-8 text-green-600" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-green-800 mb-6">
              Clean India
              <span className="block text-4xl md:text-5xl text-green-600 mt-2">Solid Waste Bidding</span>
            </h1>
            <p className="text-xl text-green-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Revolutionizing solid waste management through transparent bidding platform. 
              Connect municipalities with recyclers for a sustainable, circular economy.
            </p>
            
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link 
            to="/login" 
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2 text-lg"
          >
            <span>Join Clean India Mission</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link 
            to="/dashboard" 
            className="bg-white text-green-600 border-2 border-green-600 hover:bg-green-50 px-8 py-4 rounded-lg font-semibold transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View Waste Dashboard
          </Link>
          <Link 
            to="/demo" 
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2 text-lg"
          >
            <span>Try Live Bidding Demo</span>
            <Zap className="h-5 w-5" />
          </Link>
        </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-green-800">500+</div>
                <div className="text-green-600 text-sm">Active Tenders</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-green-800">1000+</div>
                <div className="text-green-600 text-sm">Registered Recyclers</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-green-800">50+</div>
                <div className="text-green-600 text-sm">Municipalities</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-green-800">1000+</div>
                <div className="text-green-600 text-sm">Tonnes Recycled</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-800 mb-4">
              Solid Waste Management Solutions
            </h2>
            <p className="text-xl text-green-600 max-w-3xl mx-auto">
              Comprehensive platform for transparent solid waste bidding and sustainable disposal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center rounded-2xl">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-4">Municipality Dashboard</h3>
              <p className="text-green-600 mb-4">
                Create and manage solid waste tenders with real-time bidding and analytics
              </p>
              <ul className="text-sm text-green-700 text-left space-y-2">
                <li>• Create waste disposal tenders</li>
                <li>• Monitor bidding activity</li>
                <li>• Track waste collection</li>
                <li>• Generate reports</li>
              </ul>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center rounded-2xl">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Recycle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-4">Recycler Dashboard</h3>
              <p className="text-green-600 mb-4">
                Bid on waste tenders and manage your recycling business efficiently
              </p>
              <ul className="text-sm text-green-700 text-left space-y-2">
                <li>• Browse available tenders</li>
                <li>• Submit competitive bids</li>
                <li>• Track your orders</li>
                <li>• Manage payments</li>
              </ul>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center rounded-2xl">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-4">Analytics & Insights</h3>
              <p className="text-green-600 mb-4">
                Comprehensive analytics for waste management optimization
              </p>
              <ul className="text-sm text-green-700 text-left space-y-2">
                <li>• Waste collection trends</li>
                <li>• Revenue tracking</li>
                <li>• Environmental impact</li>
                <li>• Performance metrics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Waste Types Section */}
      <div className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-16">
            <h2 className="text-4xl font-bold mb-4">Solid Waste Categories</h2>
            <p className="text-xl text-green-100">
              Comprehensive bidding for all types of solid waste
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <Trash2 className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Organic Waste</h3>
              <p className="text-green-100 text-sm">Food waste, garden waste, biodegradable materials</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <Factory className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Industrial Waste</h3>
              <p className="text-green-100 text-sm">Manufacturing waste, construction debris</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <Truck className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Municipal Waste</h3>
              <p className="text-green-100 text-sm">Household waste, street cleaning waste</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <Recycle className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Recyclable Waste</h3>
              <p className="text-green-100 text-sm">Paper, plastic, metal, glass materials</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-16">
            <h2 className="text-4xl font-bold mb-4">Making a Difference</h2>
            <p className="text-xl text-green-100">
              Join thousands of users contributing to Clean India
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-green-100">Active Tenders</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-green-100">Registered Recyclers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-green-100">Municipalities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-green-100">Tonnes Recycled</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-green-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-green-800 mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-600 mb-8">
            Join the Clean India movement and contribute to sustainable waste management
          </p>
          <Link 
            to="/login" 
            className="green-india-button inline-flex items-center space-x-2 text-lg px-8 py-4"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Recycle className="h-8 w-8 text-green-200" />
              <Leaf className="h-6 w-6 text-green-300" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Clean India Bidding</h3>
            <p className="text-green-200 mb-4">
              Sustainable waste management for a greener tomorrow
            </p>
            <p className="text-green-300 text-sm">
              © 2024 Clean India Bidding Platform. Contributing to a sustainable future.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
