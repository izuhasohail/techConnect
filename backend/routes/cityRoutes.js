

import express from 'express';
const cityRouter = express.Router();

cityRouter.get('/',(req, res) => {
    res.send('Hello');
  } );


export default cityRouter;




  