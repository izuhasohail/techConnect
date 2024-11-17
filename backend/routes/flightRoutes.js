import express from 'express';
import { getFlights } from '../controller/flightController.js';
const flightRouter = express.Router();

flightRouter.post('/', getFlights);

export default flightRouter