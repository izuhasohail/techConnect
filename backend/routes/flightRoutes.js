import express from 'express';
import { getFlights } from '../controller/flightController.js';
const flightRouter = express.Router();

flightRouter.get('/', getFlights);

export default flightRouter