'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiFilter } from 'react-icons/fi'
import { format, addDays } from 'date-fns'

export default function Listing() {
  const [selectedDay, setSelectedDay] = useState(new Date())

  // Mock ticket data
  const tickets = [
    { id: '1', type: 'flight', from: 'New York', to: 'London', departureTime: '09:00', arrivalTime: '21:00', price: 350 },
    { id: '2', type: 'bus', from: 'Boston', to: 'Washington D.C.', departureTime: '10:30', arrivalTime: '16:30', price: 50 },
    { id: '3', type: 'flight', from: 'Los Angeles', to: 'Tokyo', departureTime: '23:00', arrivalTime: '05:00', price: 800 },
    { id: '4', type: 'bus', from: 'Chicago', to: 'Detroit', departureTime: '08:00', arrivalTime: '13:00', price: 40 },
    { id: '5', type: 'flight', from: 'Miami', to: 'Paris', departureTime: '14:00', arrivalTime: '05:30', price: 500 },
  ]

  const days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Ticket Listing</h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white rounded-full shadow-md"
          >
            <FiFilter className="text-gray-600 text-xl" />
          </motion.button>
        </div>

        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-4">
            {days.map((day) => (
              <motion.button
                key={day.toISOString()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full ${
                  selectedDay.toDateString() === day.toDateString()
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-800'
                } shadow-md focus:outline-none`}
                onClick={() => setSelectedDay(day)}
              >
                {format(day, 'EEE, MMM d')}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 overflow-y-auto max-h-[calc(100vh-250px)] pr-2"
        >
          {tickets.map((ticket) => (
            <motion.div
              key={ticket.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
            >
              <div>
                <div className="flex items-center mb-2">
                  <span className={`text-sm font-semibold px-2 py-1 rounded ${
                    ticket.type === 'flight' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {ticket.type.charAt(0).toUpperCase() + ticket.type.slice(1)}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">{ticket.from} to {ticket.to}</h2>
                <p className="text-sm text-gray-600">Departure: {ticket.departureTime} | Arrival: {ticket.arrivalTime}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">${ticket.price}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold hover:bg-blue-600 focus:outline-none"
                >
                  Book Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
