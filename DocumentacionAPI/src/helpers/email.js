import { config } from "../config/config.js";
import jwt from "jsonwebtoken";
import { transporter } from "../config/email.js";

export const generateEmailToken=(email,expireTime)=>{
    const token=jwt.sign({email},config.gmail.secretToken,{expiresIn:expireTime});
    return token;

}
export const sendChangePasswordEmail= async(req,userEmail,token)=>{
    const domain = `${req.protocol}://${req.get('host')}`;
    const link=`${domain}/reset-password?token=${token}`; //enlace con el token

    //enviamos correo con enlace
    await transporter.sendMail({
        from:"Ecoomerce Maria",
        to:userEmail,
        subject:"Restablecer contraseña",
        html:`
            <div>
            <h2> Hola !! </h2>
            <p> Solicitaste restablecer contraseña, da click en el siguiente botton:</p>
            <a href="${link}">
               <button>
               Restablecer contraseña
               </button>

            </a>
            `

    })

};

export const verifyEmailToken=(token)=>{
    try {
        const info=jwt.verify(token,config.gmail.secretToken);
        return info.email;
        
    } catch (error) {
        return null;
        
    }
  

};