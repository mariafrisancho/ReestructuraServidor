import { CartsService } from "../service/carts.service.js";
import {ProductsService} from"../service/products.service.js";
import {v4 as uuidv4} from 'uuid';


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
    static getCart=async(req,res)=>{
        try {
            const cartId = req.params.cid;
            const result = await CartsService.getCartById(cartId);
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
            const existCart= await CartsService.getCartById(cartId);
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

    static addProductToCart=async(req,res)=>{

        try {
            const{cid:cartId,pid:productId}=req.params;
            // verificar si existe el IDcarrito
            const existCart= await CartsService.getCartById(cartId);
            const product = await ProductsService.getProductById(productId);
            if(!product){
                return   res.json({error:error.message});
              
            }
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
            const cart= await CartsService.getCartById(cartId); //evaluar si el carrito existe
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
            
                const cart= await CartsService.getCartById(cartId); //evaluar si el carrito existe
             if(cart){
                const result = await CartsService.deleteProduct(cartId,productId);
     
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
            
     
             const cart= await CartsService.getCartById(cartId); //evaluar si el carrito existe
             if(cart){
                const result = await CartsService.deleteProductAll(cartId);
     
                res.json({status:"succes", data:result});
    
             } else{
                throw new Error("El carrito no existe");
    
             }
               
           
     
         } catch (error) {
     
             res.json({status:"error", message:error.message});
     
         }
     
    
    }

    static purchaseCart = async(req,res)=>{
        try {
            const {cid: cartId} = req.params;
            const cart = await CartsService.getCartById(cartId);
            let totalTicket=0;
        
            // verificar si el carrito tiene productos
            if(cart.products.length){
                const ticketProducts=[];
                const rejectedProducts=[];
                //verificar el stock de cada producto
                for(let i=0;i<cart.products.length;i++){
                    const cartProduct =cart.products[i];
                    const productInfo = cartProduct.productId;
            
                    //por cada producto comparar quantity con el stock
                    if(cartProduct.quantity <= productInfo.stock){
                     
                        ticketProducts.push(cartProduct);

                    } else {
                        rejectedProducts.push(cartProduct);
                    }
                };

                console.log("ticketProducts",ticketProducts);
                console.log("rejectedProducts",rejectedProducts);
             
            // obtener el total del tickete 
               for(let i=0;i<ticketProducts.length;i++){
                    totalTicket= totalTicket+ticketProducts[i].quantity*ticketProducts[i].productId.price;
                 
                } 
          
               // generarmos la estructura del ticket
                const newTicket = {
                    code:uuidv4(),
                    purchase_datetime: new Date(),
                    amount:totalTicket,
                    purchaser:req.user.email
                };
                console.log("newTicket",newTicket);
           

                //crear el ticket en base de datos.
                 const ticketcreate= await CartsService.createTickets(newTicket);
         
          
                // Actualiza el carrito  
                 // 1---borra todos los productos del carrito 
                      const deleteproducts= await CartsService.deleteProductAll(cartId);
                 /// 2---si existe productos por falta de stock que se encuentran
                     /// en el array rejectedProducts actualiza el carrito ,
                     //  primero creamos el objeto con idproducto y la cantidad
                 
               
                        if (rejectedProducts.length){
                            
                            let productcart=[];
                            for(let i=0;i<rejectedProducts.length;i++){
                                const newproduct={
                                    productId:rejectedProducts[i].productId._id,
                                    quantity:rejectedProducts[i].quantity

                                }
                                productcart.push(newproduct);
                                
                            
                            } 
                        // insertamos los productos no comprados al carrito
                        const updateCarts=await CartsService.addProducts(cartId,productcart)
                        // mostramos el mensaje que algunos productos no se han podido comprar
                        res.json({status:"success", message:"Compra realizada, algunos productos no se pudieron comprar por falta de stock", rejectedProducts});
                        } else {

                            // mensaje que todos los productos fueron comprados
                           
                            res.json({status:"success", message:"Compra realizada con exito", ticketcreate});

                        }
             

                
            } else {
                // si el carrito esta vacio
                res.json({status:"error", message:"El carrito esta vacio"});
            }
        } catch (error) {
            res.json({error:error.message});
        }
    };


}