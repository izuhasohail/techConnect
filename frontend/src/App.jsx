import { Routes, Route } from 'react-router-dom'
import './App.css'
import TicketBooking from './pages/TicketBooking/TicketBooking'
function App() {
  

  return (
    <Routes>
      <Route path="/" element={<TicketBooking />} />
    </Routes>
  )
}

export default App
