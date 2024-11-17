import mongoose from 'mongoose';
import Bus from './models/busModel.js';
import City from './models/cityModel.js';
import Country from './models/countryModel.js'; // Assuming you have a Country model
import Flight from './models/flightModel.js';
import { allowedCities, allowedBuses, allowedCountries, allowedFlights } from './allowedData.js';
import dotenv from 'dotenv';

dotenv.config()
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

    // Get today's and tomorrow's dates
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    // Initialize buses
    console.log('Initializing buses...');
    await Bus.deleteMany({});
    const busPromises = allowedBuses.map(bus => {
      return [
        new Bus({
          ...bus,
          departureTime: today,
          arrivalTime: new Date(today.getTime() + 2 * 60 * 60 * 1000), // 2 hours later
          price: 100,
          availableSeats: 40,
          ratings: 4.5,
        }).save(),
        new Bus({
          ...bus,
          departureTime: tomorrow,
          arrivalTime: new Date(tomorrow.getTime() + 2 * 60 * 60 * 1000), // 2 hours later
          price: 100,
          availableSeats: 40,
          ratings: 4.5,
        }).save()
      ];
    }).flat();
    await Promise.all(busPromises);
    console.log('Buses initialized successfully');

    // Initialize flights
    console.log('Initializing flights...');
    await Flight.deleteMany({});
    const flightPromises = allowedFlights.map(flight => {
      return [
        new Flight({
          ...flight,
          departureTime: today,
          arrivalTime: new Date(today.getTime() + 4 * 60 * 60 * 1000), // 4 hours later
          price: 500,
          availableSeats: 150,
          ratings: 4.5,
        }).save(),
        new Flight({
          ...flight,
          departureTime: tomorrow,
          arrivalTime: new Date(tomorrow.getTime() + 4 * 60 * 60 * 1000), // 4 hours later
          price: 500,
          availableSeats: 150,
          ratings: 4.5,
        }).save()
      ];
    }).flat();
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