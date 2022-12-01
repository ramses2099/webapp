import passport from 'passport';
import { Strategy } from 'passport-local';

function localStrategy(){
    passport.use(new Strategy({
        usernameField:'username',
        passwordField:'password'
    },(username, password, done)=>{
        const user ={username, password, 'name':'pepe'}
        done(null, user);
    }));

}

export { localStrategy }