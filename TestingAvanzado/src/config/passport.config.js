import passport from "passport";
import localStrategy from "passport-local";
import { createHash,inValidPassword } from "../utils.js";
import {logger} from "../helpers/logger.js";

import { UserService } from "../service/user.service.js";
import { config } from "./config.js";
import GithubStrategy from "passport-github2";

export const initializePassport=()=>{


    // estrategia para registar a los usuarios

    passport.use("signupLocalStrategy",new localStrategy(
        {
            passReqToCallback:true,
            usernameField:"email", //ahora el campo username es igual al campo emial

        },
        async (req,username,password,done)=>{
            const {firts_name,last_name,age}=req.body;
            try {
                const user= await UserService.getUserbyEmail(username);


                
                if(user){
                    // el usuario ya esta registrado
                    return done(null,false)
                }
                // el usuario no esta registrado 
           
                const newUser={
                    firts_name:firts_name,
                    last_name:last_name,
                    age:age,
                    email:username,
                    password:createHash(password)
                    
                };
            
                logger.informativo(newUser);
                const userCreated= await UserService.signupUser(newUser);
                return done(null,userCreated);

              
            } catch (error) {
                return done (error);
                
            }

        }
        
        ));
   // estrategia  para login
    passport.use("loginLocalStrategy",new localStrategy(
            {
          
                usernameField:"email", //ahora el campo username es igual al campo emial
    
            },
            async (username,password,done)=>{
           
                try {
                  
                    const user= await UserService.getUserbyEmail(username);
                 
                     // el usuario no esta registrado

                    if(!user){
                       
                        return done(null,false);
                    }

                   if(!inValidPassword(password,user)){

                    return done(null,false);

                   }
                   // validamos que el usuario esta registrado y que la contraseña es correcta
                   return done (null,user);
    
                  
                } catch (error) {
                    return done (error);
                    
                }
    
            }
            
            ))

    // estrategia de registro  para Github
    passport.use("signupGithubStrategy", new GithubStrategy(

        {

            clientID: config.github.clientId,

            clientSecret: config.github.clientSecret,

            callbackURL: `http://localhost:8080/api/sessions${config.github.callbackUrl}`

        },
        async(accessToken,refreshToken,profile,done)=>{
            try {
                logger.informativo("profile",profile);
                //const user= await usersModel.findOne({email:profile.username});
                const user= await UserService.getUserbyEmail(profile.username);
                if(user) {
                    // el usuario ya esta registrado
                    return done(null,user);
                }
                // el usuario no esta registrado
                const newUser={
                    firts_name:profile.displayName,
                    last_name:profile.username,
                    age:0,
                    email:profile.username,
                    password:"1234"
                    
                };
                logger.informativo(newUser);
                const userCreated= await UserService.signupUser(newUser);
                return done(null,userCreated);
            

                
            } catch (error) {
                return done (error);
            }

        }

    ));
    
    passport.serializeUser((user,done)=>{
            done(null,user._id);
        });

    passport.deserializeUser(async(id,done)=>{
            const user= await UserService.getUserbyid(id);
            done(null,user); // req.user=informacion del usuario treamos de la base de datos

        });
}