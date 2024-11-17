import mongoose from 'mongoose';
import Bus from './models/busModel.js';
import City from './models/cityModel.js';
import Flight from './models/flightModel.js';
import { allowedCities, allowedBuses, allowedCountries, allowedFlights } from './allowedData.js';

const initData = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Initialize cities
    await City.deleteMany({});
    const cityPromises = allowedCities.map(city => new City({ name: city }).save());
    await Promise.all(cityPromises);

    // Initialize buses
    await Bus.deleteMany({});
    const busPromises = allowedBuses.map(bus => new Bus({
      ...bus,
      departureTime: new Date(), // Set predefined timings
      arrivalTime: new Date(), // Set predefined timings
      price: 100, // Set a default price
      availableSeats: 40, // Set default available seats
      ratings: 4.5, // Set default ratings
    }).save());
    await Promise.all(busPromises);

    // Initialize flights
    await Flight.deleteMany({});
    const flightPromises = allowedFlights.map(flight => new Flight({
      ...flight,
      departureTime: new Date(), // Set predefined timings
      arrivalTime: new Date(), // Set predefined timings
      price: 500, // Set a default price
      availableSeats: 150, // Set default available seats
      ratings: 4.5, // Set default ratings
    }).save());
    await Promise.all(flightPromises);

    console.log('Data initialized successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error initializing data:', error);
    mongoose.disconnect();
  }
};

initData();