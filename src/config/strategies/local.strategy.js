import passport from 'passport';
import { Strategy } from 'passport-local';

import debug from 'debug';
import mongodb, { ObjectId } from 'mongodb';

const debugs = debug('app:local.strategy');
const url = 'mongodb+srv://dbUser:hWuoqA1Hy1Iwa3Ae@globomantics.s0ve7g1.mongodb.net?retryWrites=true&w=majority';
const dbName = 'globomantics';

function localStrategy(){
    passport.use(new Strategy({
        usernameField:'username',
        passwordField:'password'
    },(username, password, done)=>{
        
        let client;
        (async function mongo(){
            try {
                client = await mongodb.MongoClient.connect(url);
                debugs('Connected to the mongo DB');
    
                const db = client.db(dbName);
                const user = await db.collection('users').findOne({username});
                
                if(user && user.passport === password){
                    done(null, user);
                }
    
            } catch (error) {
                debugs(error.stack);
                done(error, null);
            }
            client.close();
        })();

       
    }));

}

export { localStrategy }