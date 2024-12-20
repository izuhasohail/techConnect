import Booking from "../models/bookingModel.js";
import Bus from "../models/busModel.js";
import Flight from "../models/flightModel.js";

export const createBooking = async (req, res) => {
  try {
    const { travelType, travelId, count } = req.body;
    let travel;
    if (travelType === 'bus') {
      travel = await Bus.findById(travelId);
    } else if (travelType === 'flight') {
      travel = await Flight.findById(travelId);
    }

    if (!travel) {
      return res.status(404).json({ message: "Travel not found" });
    }

    console.log('Travel found is :', travel)

    const totalPrice = travel.price * count;
    const booking = new Booking({ ...req.body, totalPrice });
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};