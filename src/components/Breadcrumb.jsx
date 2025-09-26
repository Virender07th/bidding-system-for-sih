import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

const Breadcrumb = () => {
  const location = useLocation()
  
  const getBreadcrumbItems = () => {
    const pathnames = location.pathname.split('/').filter(x => x)
    const breadcrumbItems = [
      { name: 'Home', href: '/', current: location.pathname === '/' }
    ]

    let currentPath = ''
    pathnames.forEach((pathname, index) => {
      currentPath += `/${pathname}`
      
      const name = pathname.charAt(0).toUpperCase() + pathname.slice(1)
      const isLast = index === pathnames.length - 1
      
      breadcrumbItems.push({
        name: name === 'Dashboard' ? 'Waste Dashboard' : 
              name === 'Admin' ? 'Admin Panel' :
              name === 'User' ? 'My Profile' :
              name === 'Bids' ? 'Browse Tenders' :
              name,
        href: currentPath,
        current: isLast
      })
    })

    return breadcrumbItems
  }

  const breadcrumbItems = getBreadcrumbItems()

  if (breadcrumbItems.length <= 1) return null

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
      <Link 
        to="/" 
        className="flex items-center space-x-1 hover:text-green-600 transition-colors"
      >
        <Home className="h-4 w-4" />
        <span>Home</span>
      </Link>
      
      {breadcrumbItems.slice(1).map((item, index) => (
        <div key={item.href} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4 text-gray-400" />
          {item.current ? (
            <span className="text-green-600 font-medium">{item.name}</span>
          ) : (
            <Link 
              to={item.href}
              className="hover:text-green-600 transition-colors"
            >
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}

export default Breadcrumb
