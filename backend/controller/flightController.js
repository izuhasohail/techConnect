import Flight from "../models/flightModel.js";
import { allowedCountries, allowedFlights } from '../allowedData.js';

export const getFlights = async (req, res) => {
  try {
    const { departureCountry, arrivalCountry, date } = req.query;

    // Check if the countries are allowed
    if (!allowedCountries.includes(departureCountry) || !allowedCountries.includes(arrivalCountry)) {
      return res.status(400).json({ message: "Invalid departure or arrival country" });
    }

    const allowedFlightNumbers = allowedFlights.map(flight => flight.flightNumber);

    const flights = await Flight.find({
      departureCountry,
      arrivalCountry,
      departureTime: { $gte: new Date(date) },
      flightNumber: { $in: allowedFlightNumbers } // Filter by allowed flights
    });

    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};