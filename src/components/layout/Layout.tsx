import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useScrollToTop } from '../../hooks/useScrollToTop'

export default function Layout() {
  useScrollToTop()
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
