export class SessionsController{

 // redirecciona al profile
    static redirecProfile = (req,res)=>{
        res.redirect("/profile")
    };

    // redireciona 
    static redirecProfile = (req,res)=>{
        res.redirect("/profile")
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
}