import passport from 'passport';
import { localStrategy } from './strategies/local.strategy.js';


function passportConfig(app){

  localStrategy();

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done)=>{
    done(null, user);
  });
  //
  passport.deserializeUser((user, done)=>{
    done(null, user);
  })

}

export { passportConfig }