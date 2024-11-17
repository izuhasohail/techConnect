import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  travelType: { type: String, enum: ['flight', 'bus'], required: true },
  travelId: { type: mongoose.Schema.Types.ObjectId, refPath: 'travelType', required: true },
  passengerDetails: { type: Array, required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;