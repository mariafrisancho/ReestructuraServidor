import { Router } from "express";
import { ProductsService } from "../service/products.service.js";


const router = Router();

 router.get("/", async(req,res)=>{
    const {limit=10,page=1} = req.query;
    const query = {
       
    };
    const options = {
        limit:10,
        page,
        sort:{price:1},
        lean:true
    };
    const result= await ProductsService.getProductsPaginate(query,options);
    const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    const dataProducts = {
        status:"success",
        payload: result.docs,
        totalPages: result.totalPages,
         prevLink: result.hasPrevPage ? `${baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`)}` : null,
        nextLink: result.hasNextPage ? baseUrl.includes("page") ?
    baseUrl.replace(`page=${result.page}`, `page=${result.nextPage}`) : baseUrl.concat(`?page=${result.nextPage}`) : null
    }
    //console.log(dataProducts);//{status:"sucess", payload:[]}
    res.render("home",dataProducts);
  
 }); 

// endPoint registrar usuario
router.get("/signup",(req,res)=>{
    res.render("signupView");
});


// endPoint registrar logearse usuario
router.get("/login",(req,res)=>{
    res.render("loginView");
});

router.get("/profile",(req,res)=>{
    console.log("desde el profile",req.user);
    if(req.user?.email){
        const userEmail = req.user.email;
        res.render("profileView",{userEmail});
    } else {
        res.redirect("/login");
    }

  
});
export {router as viewsRouter}