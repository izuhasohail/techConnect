import Bus from "../models/busModel.js";
import { allowedCities, allowedBuses } from '../allowedData.js';

export const getBuses = async (req, res) => {
  try {
    const { departureCity, arrivalCity, date } = req.body;

    console.log('HERES THE DATA ',departureCity, arrivalCity, date);

    // Check if the cities are allowed
    if (!allowedCities.includes(departureCity) || !allowedCities.includes(arrivalCity)) {


      console.log('Invaliddddd')
      return res.status(400).json({ message: "Invalid departure or arrival city" });

    }

    console.log('succesfullyy')

    const allowedBusNames = allowedBuses.map(bus => bus.name);

    const buses = await Bus.find({
      departureCity,
      arrivalCity,
      
   departureTime: { $gte: new Date(date) },
     name: { $in: allowedBusNames } // Filter by allowed buses
      
    });


    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};