import express from 'express';
import debug from 'debug';
import mongodb from 'mongodb';

const debugs = debug('app:authRouter');

const authRouter = express.Router();

authRouter.route('/signUp').post((req, res)=>{
    const body = req.body;    
   
});
  

export {authRouter};