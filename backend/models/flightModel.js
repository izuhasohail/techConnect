import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  airline: { type: String, required: true },
  departureCountry: { type: String, required: true },
  arrivalCountry: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  price: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  ratings: { type: Number, required: true, min: 0, max: 5 },
});

const Flight = mongoose.model('Flight', flightSchema);

export default Flight;