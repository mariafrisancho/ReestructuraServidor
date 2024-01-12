import { generateEmailToken, sendChangePasswordEmail, verifyEmailToken } from "../helpers/email.js";
import { UserService } from "../service/user.service.js";
import { createHash, inValidPassword } from "../utils.js";

export class SessionsController{

 // redirecciona al profile
    static redirecProfile = (req,res)=>{
        res.redirect("/profile")
    };

    // redireciona 
    static redirecProfile = (req,res)=>{
        //res.redirect("/profile")
           res.send("logueado");
     
    };



    static failSignup = (req,res)=>{
        res.render("signup",{error:"No se pudo registrar al usuario"});
        // res.json({status:"error", message:"No se pudo registrar al usuario"});
    };

   
    static redirectLogin = (req,res)=>{
       res.redirect("/login");
    };

   
    static failLogin = (req,res)=>{
        res.render("login",{error:"No se pudo iniciar sesion para el usuario"});
        // res.json({status:"error", message:"No se pudo registrar al usuario"});
    };
    static forgotPassword=async(req,res)=>{
        const {email}=req.body;
        console.log(email);
        try {
            const user=await UserService.getUserbyEmail(email);
            
            //crear token
            const emailToken=generateEmailToken(email,5*60); // 5 min
            await sendChangePasswordEmail(req,email,emailToken);
            res.send(`Se envio un enlace  a su correo, <a href="/"> Volver a la pagina de login </a>`);
            
        } catch (error) {
            res.json({status:"error",message:error.message});
            
        }
    
       

    };

    static resetPassword=async (req,res)=>{
        try {
            const token=req.query.token;
            const {newPassword}=req.body;
            const validEmail=verifyEmailToken(token);
            if(!validEmail){
                return res.send(`El enlace ya no es valido,genera un nuevo <a href="/forgot-password">enlace</a>`);
            }
            const user= await UserService.getUserbyEmail(validEmail);
            if(!user){
                return res.send(`Esta operacion no es valida`);
            }
            // comparar contraseñas
            if(inValidPassword(newPassword,user)){
                return res.render("resetPassView",{error:"contraseña invalida",token})

            }
            const userData={
                ...user,
                password:createHash(newPassword)
            };
         
            await UserService.updateUser(user._id, userData);
            //res.render("loginview");
            res.render("loginView",{message:"Contraseña actualizada"});

            
        } catch (error) {
            res.json({status:"error",message:error.message});
            
        }

    };
}