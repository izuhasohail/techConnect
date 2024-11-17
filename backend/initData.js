import mongoose from 'mongoose';
import Bus from './models/busModel.js';
import City from './models/cityModel.js';
import Country from './models/countryModel.js'; // Assuming you have a Country model
import Flight from './models/flightModel.js';
import { allowedCities, allowedBuses, allowedCountries, allowedFlights } from './allowedData.js';
import dotenv from 'dotenv';


dotenv.config();

const initData = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000, // Increase timeout to 30 seconds
    });
    console.log('Connected to MongoDB');

    // Initialize cities
    console.log('Initializing cities...');
    await City.deleteMany({});
    const cityPromises = allowedCities.map(city => new City({ name: city }).save());
    await Promise.all(cityPromises);
    console.log('Cities initialized successfully');

    // Initialize countries
    console.log('Initializing countries...');
    await Country.deleteMany({});
    const countryPromises = allowedCountries.map(country => new Country({ name: country }).save());
    await Promise.all(countryPromises);
    console.log('Countries initialized successfully');

    // Initialize buses
    console.log('Initializing buses...');
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
    console.log('Buses initialized successfully');

    // Initialize flights
    console.log('Initializing flights...');
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
    console.log('Flights initialized successfully');

    console.log('Data initialized successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error initializing data:', error);
    mongoose.disconnect();
  }
};

initData();