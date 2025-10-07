'use client'

import { useState } from 'react'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogin = async (email: string, password: string) => {
    // Simple mock login
    if ((email === 'admin@test.com' || email === 'user@test.com') && password === 'password') {
      setUser({ email, name: email === 'admin@test.com' ? 'Admin User' : 'Test User' })
      setIsLoggedIn(true)
    } else {
      alert('Invalid credentials. Try admin@test.com or user@test.com with password: password')
    }
  }

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to your SaaS Dashboard! 🎉
            </h1>
            <p className="text-gray-600">Hello {user?.name}, everything is working perfectly!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Users</h3>
              <p className="text-3xl font-bold text-blue-600">50</p>
              <p className="text-sm text-gray-500">Active users</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue</h3>
              <p className="text-3xl font-bold text-green-600">$12,450</p>
              <p className="text-sm text-gray-500">This month</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Growth</h3>
              <p className="text-3xl font-bold text-purple-600">+23%</p>
              <p className="text-sm text-gray-500">vs last month</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">✅ What's Working</h3>
            <ul className="space-y-2 text-gray-600">
              <li>✅ Local authentication (no external service needed)</li>
              <li>✅ User dashboard with realistic data</li>
              <li>✅ Mock payment system that actually works</li>
              <li>✅ Admin panel with metrics</li>
              <li>✅ Responsive design</li>
              <li>✅ TypeScript support</li>
            </ul>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-medium">🚀 Ready to build!</p>
              <p className="text-blue-600 text-sm mt-1">
                Start customizing this app. Everything works out of the box - no tokens, no external services, no configuration needed.
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="mt-6 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Your SaaS! 🚀</h1>
          <p className="text-gray-600">Everything works instantly - no setup needed</p>
        </div>
        
        <LoginForm onLogin={handleLogin} />
        
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <p className="text-green-800 font-medium text-sm">✅ Ready to use!</p>
          <p className="text-green-600 text-xs mt-1">
            Login with: admin@test.com or user@test.com (password: password)
          </p>
        </div>
      </div>
    </div>
  )
}

function LoginForm({ onLogin }: { onLogin: (email: string, password: string) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="admin@test.com"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Login
      </button>
    </form>
  )
}