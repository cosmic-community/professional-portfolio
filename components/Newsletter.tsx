'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setStatus('success')
        setMessage(data.message)
        setName('')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Failed to subscribe. Please try again.')
    }
  }
  
  return (
    <section className="py-16 px-4 bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-gray-300 mb-8">
          Subscribe to our newsletter to receive updates about new projects and photography tips
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
          
          {message && (
            <div className={`p-4 rounded-lg ${
              status === 'success' 
                ? 'bg-green-500 bg-opacity-20 text-green-100' 
                : 'bg-red-500 bg-opacity-20 text-red-100'
            }`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </section>
  )
}