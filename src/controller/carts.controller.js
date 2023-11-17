import { CartsService } from "../service/carts.service.js";


    // arreglo de productos para controller addProducts
    const productos=[ ];

export class cartsController {
    static getCarts= async(req,res)=>{
        try {
            const result = await CartsService.getCarts();
            res.json({status:"success", data:result});
        } catch (error) {
            res.status(500).json({status:"error", message:error.message});
        }
    };
    static getCartsById=async(req,res)=>{
        try {
            const cartId = req.params.cid;
            const result = await CartsService.getCartsById(cartId);
            res.json({status:"success", data:result});
        } catch (error) {
            res.status(500).json({status:"error", message:error.message});
        }
    };

    static createCart= async(req,res)=>{
        try {
            //const cartinfo = req.body;
            const result = await CartsService.createCart();
            res.json({status:"success", data:result});
        } catch (error) {
            res.status(500).json({status:"error", message:error.message});
        }
    };

     
    static addProducts=async(req,res)=>{

        try {
            const{cid:cartId}=req.params;
            // verificar si existe el IDcarrito
            const existCart= await CartsService.getCartsById(cartId);
            if(existCart){
                const result = await CartsService.addProducts(cartId,productos);
                res.json({status:"success", data:result});
            } else{
                throw new Error("El carrito no existe");
    
            }
                       
          
        } catch (error) {
    
            res.json({status:"error", message:error.message});
    
        }
    
    };

    static addProduct=async(req,res)=>{

        try {
            const{cid:cartId,pid:productId}=req.params;
            // verificar si existe el IDcarrito
            const existCart= await CartsService.getCartsById(cartId);
            if(existCart){
                const result = await CartsService.addProduct(cartId,productId);
                res.json({status:"success", data:result});
            } else{
                throw new Error("El carrito no existe");
    
            }
                            
              
        } catch (error) {
    
            res.json({status:"error", message:error.message});
    
        }
    
    };

    static updateProductCart=async(req,res)=>{
        try {
            const{cid:cartId,pid:productId}=req.params;
            const {newQuantity}=req.body;
             // evalua si existe el carrito
            const cart= await CartsService.getCartsById(cartId); //evaluar si el carrito existe
             if(cart){
                const result = await CartsService.updateProductCart(cartId,productId,newQuantity);
                 res.json({status:"succes", data:result});
    
             } else{
                throw new Error("El carrito no existe");
    
             }      
           
     
         } catch (error) {
     
             res.json({status:"error", message:error.message});
     
         }
         
    };

    static deleteProduct=async(req,res)=>{
        try {
            const{cid:cartId,pid:productId}=req.params;
            
                const cart= await cartsService.getCartsById(cartId); //evaluar si el carrito existe
             if(cart){
                const result = await cartsService.deleteProduct(cartId,productId);
     
                res.json({status:"succes", data:result});
    
             } else{
                throw new Error("El carrito no existe");
    
             }
               
           
     
         } catch (error) {
     
             res.json({status:"error", message:error.message});
     
         }
     
    
    };

    static deleteProductAll=async(req,res)=>{
        try {
            const{cid:cartId}=req.params;
            
     
             const cart= await cartsService.getCartsById(cartId); //evaluar si el carrito existe
             if(cart){
                const result = await cartsService.deleteProductAll(cartId);
     
                res.json({status:"succes", data:result});
    
             } else{
                throw new Error("El carrito no existe");
    
             }
               
           
     
         } catch (error) {
     
             res.json({status:"error", message:error.message});
     
         }
     
    
    }


}