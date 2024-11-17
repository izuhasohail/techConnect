import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  company: { type: String, required: true },
  departureCity: { type: String, required: true },
  arrivalCity: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  price: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  ratings: { type: Number, required: true, min: 0, max: 5 },
});

const Bus = mongoose.model('Bus', busSchema);

export default Bus;