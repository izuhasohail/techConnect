import express from 'express';
import { getBuses } from '../controller/busController.js';
const busRouter = express.Router();

busRouter.get('/', getBuses);


export default busRouter;
