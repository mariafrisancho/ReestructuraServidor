import { Router } from "express";

import { config } from "../config/config.js"; // para logearse con github
import { SessionsController } from "../controller/sessions.controller.js";

import passport from "passport";

const router =Router();


//Ruta de solicitud registro con github

router.get("/signup-github", passport.authenticate("signupGithubStrategy"));

//ruta del callback con github

router.get(config.github.callbackUrl, passport.authenticate("signupGithubStrategy",{

    failureRedirect:"/api/sessions/fail-signup"

}), SessionsController.redirecProfile);

// ruta para el registro de usuario

router.post("/signup",passport.authenticate("signupLocalStrategy",{
    failureRedirect:"/api/sessions/fail-signup"
}),async(req,res)=>{
    res.render("loginView",{message: "usuario registrado correctamente"});

});


router.get("/fail-signup",SessionsController.failSignup);

// ruta para login de usuario
router.post("/login",passport.authenticate("loginLocalStrategy",{
    failureRedirect:"/api/sessions/fail-login"
}), SessionsController.redirecProfile);

router.get("/fail-login",SessionsController.failLogin);

// ruta current
router.get("/current",async(req,res)=>{
    
})

router.get("/logout",async(req,res)=>{
    try {
        req.session.destroy(err=>{
            if(err)return res.render("profileView",{error:"No se pudo cerrrar la session"});
            res.redirect("/");
        })
       
        
    } catch (error) {
        res.render("logout",{error:"No se pudo cerrar sesion para este usuario"});
    }
});
router.post("/forgot-password",SessionsController.forgotPassword);
router.post("/reset-password",SessionsController.resetPassword);

export {router as sesionsRouter};