import express from 'express';
import debug from 'debug';
import mongodb from 'mongodb';
import sessions from '../data/sessions.json' assert { type: "json" };

const adminRouter = express.Router();
const debugs = debug('app:adminRouter');
const url = 'mongodb+srv://dbUser:hWuoqA1Hy1Iwa3Ae@globomantics.s0ve7g1.mongodb.net?retryWrites=true&w=majority';
const dbName = 'globomantics';

adminRouter.route('/').get((req, res)=>{
    let client;
    (async function mongo(){
        try {
            client = await mongodb.MongoClient.connect(url);
            debugs('Connected to the mongo DB');

            const db = client.db(dbName);
            const response = await db.collection('sessions').insertMany(sessions);

            res.json(response);

        } catch (error) {
            debugs(error.stack);
        }
        client.close();
    })();
});
  
adminRouter.route('/:id').get((req, res)=>{
    
});

export {adminRouter};