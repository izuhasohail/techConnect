'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiFilter } from 'react-icons/fi';
import { format, addDays } from 'date-fns';
import { useSelector } from "react-redux";
import axios from 'axios';
import './Listing.css';

export default function Listing({setActiveStep}) {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const bookType = useSelector((state) => state.bookType.bookType);
  const source = useSelector((state) => state.source.source);
  const destination = useSelector((state) => state.destination.destination);
  const date = useSelector((state) => state.date.date);

  const days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  useEffect(() => {
    const fetchTickets = async () => {
      if (!source || !destination || !date || !bookType) return;
      
      setLoading(true);
      setError(null);

      try {
        const endpoint = bookType === 'flight' ? '/api/flights' : '/api/buses';
        const requestData =
          bookType === 'flight'
            ? { departureCountry: source, arrivalCountry: destination, date }
            : { departureCity: source, arrivalCity: destination, date };

        const response = await axios.post(`http://localhost:5000${endpoint}`, requestData);
        setTickets(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch tickets. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [bookType, source, destination, date]);

  return (
    <div className="listing-container">
      <div className="listing-header">
        <h1>Ticket Listing</h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="filter-button"
        >
          <FiFilter />
        </motion.button>
      </div>

      <div className="days-container">
        {days.map((day) => (
          <motion.button
            key={day.toISOString()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`day-button ${
              selectedDay.toDateString() === day.toDateString() ? 'active' : ''
            }`}
            onClick={() => setSelectedDay(day)}
          >
            {format(day, 'EEE, MMM d')}
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="tickets-container"
      >
        {loading && <p>Loading tickets...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && tickets.length === 0 && (
          <p>No tickets available for the selected criteria.</p>
        )}
        {!loading &&
          !error &&
          tickets.map((ticket) => (
            <motion.div
              key={ticket.id}
              whileHover={{ scale: 1.02 }}
              className="ticket-card"
            >
              <div>
                <div className="ticket-type">
                  <span className={bookType === 'flight' ? 'flight' : 'bus'}>
                    {bookType.charAt(0).toUpperCase() + bookType.slice(1)}
                  </span>
                </div>
                <h2>{ticket.from} to {ticket.to}</h2>
                <p>Departure: {ticket.departureTime} | Arrival: {ticket.arrivalTime}</p>
              </div>
              <div className="ticket-info">
                <p className="price">${ticket.price}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="book-button"
                  onClick={() => setActiveStep(3)}
                >
                  Book Now
                </motion.button>
              </div>
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
}
