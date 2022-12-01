import express from 'express';
import debug from 'debug';
import mongodb from 'mongodb';

const debugs = debug('app:authRouter');

const authRouter = express.Router();

authRouter.route('/signUp').post((req, res)=>{
    const {username, password } = req.body;
    const url = 'mongodb+srv://dbUser:hWuoqA1Hy1Iwa3Ae@globomantics.s0ve7g1.mongodb.net?retryWrites=true&w=majority';
    const dbName = 'globomantics';

    let client;
    (async function addUser(){
        try {
            client = await mongodb.MongoClient.connect(url);
            debugs('Connected to the mongo DB');

            const db = client.db(dbName);
            const user ={username, password};
            const results = await db.collection('users').insertOne(user);
            debugs(results);

            req.login(results, ()=>{
                res.redirect('/auth/profile');
            })

        } catch (error) {
            debugs(error.stack);
        }
        client.close();
    })();


    
   
});

authRouter.route('/profile').get((req, res)=>{
   res.json(req.user);
   
});

export {authRouter};