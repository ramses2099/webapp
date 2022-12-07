import express from 'express';
import debug from 'debug';
import mongodb, { ObjectId } from 'mongodb';

const debugs = debug('app:sessionsRouter');
const url = 'mongodb+srv://dbUser:hWuoqA1Hy1Iwa3Ae@globomantics.s0ve7g1.mongodb.net?retryWrites=true&w=majority';
const dbName = 'globomantics';

const sessionsRouter = express.Router();

sessionsRouter.use((req, res, next)=>{
    if(req.user){
        next();
    }else{
        res.redirect('/aut/signIn');
    }
});

sessionsRouter.route('/').get((req, res)=>{

    let client;
    (async function mongo(){
        try {
            client = await mongodb.MongoClient.connect(url);
            debugs('Connected to the mongo DB');

            const db = client.db(dbName);
            const sessions = await db.collection('sessions').find().toArray();

            res.render('sessions',{sessions});

        } catch (error) {
            debugs(error.stack);
        }
        client.close();
    })();

});
  
sessionsRouter.route('/:id').get((req, res)=>{
    const id = req.params.id;    
    let client;
    (async function mongo(){
        try {
            client = await mongodb.MongoClient.connect(url);
            debugs('Connected to the mongo DB');
            
            const db = client.db(dbName);
            const session = await db.collection('sessions').findOne({_id: new ObjectId(id)});
            
            res.render('session',{session: session});
            
        } catch (error) {
            debugs(error.stack);
        }
        client.close();
    })();


});

export {sessionsRouter};