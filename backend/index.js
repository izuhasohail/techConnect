import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
// import authRoutes from './routes/userRoute.js';
// import billRoutes from './routes/billRoute.js';
// import notificationRoutes from './routes/notificationRoute.js';
// import stripeRoutes from './routes/stripeRoute.js';
import userRouter from './routes/userRoute.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.body);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use('/user', userRouter);
// app.use('/bills', billRoutes);
// app.use('/notifications', notificationRoutes);
// app.use('/stripe', stripeRoutes);

const PORT = process.env.PORT || 5000;



mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
}).catch((error) => {
  console.error('Connection error', error.message);
});