import { Router } from "express";
import { generateProduct } from "../helpers/mock.js";

const router = Router();

router.get("/",(req,res)=>{
    const cant = parseInt(req.query.cant) || 50;
    let products = [];
    for(let i=0;i<cant;i++){
        const newProduct = generateProduct();
        products.push(newProduct);
    };
    res.json({status:"success", data:products});
});

export {router as mockingproductsRouter};