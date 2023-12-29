import {cartsModel} from "./models/carts.model.js";
import { logger } from "../../../helpers/logger.js";


export class CartsManagerMongo{
    constructor(){
        this.model = cartsModel;
    };
   

    async getCarts(){
        try {
            const results = await this.model.find().lean();
            return results;
        } catch (error) {
            logger.error(error.message);
            throw new Error("No se pudo obtener el carrito");
        }
    };

    async getCartById(cartId){
        try {
            const result = await this.model.findById(cartId).populate("products.productId");
            // const result = await this.model.findById(cartId);
            if(!result){
                throw new Error(`El carrito con el ID: '${cartId}' no existe.`);
            };
            return result;
        } catch (error) {
            logger.error(error.message);
            throw new Error("No se pudo obtener el carrito");
        }
    };

    async createCart(){
        try {
            const newCart = {};
            const result = await this.model.create(newCart);
            return result;
        } catch (error) {
            logger.error(error.message);
            throw new Error("No se pudo crear el carrito");
        }
    };




    /// metodo para agregar productos a los carritos con array
    async addProducts(cartId, productos){
        try {
           const cart = await this.getCartById(cartId);

          for(let i=0; i< productos.length;i++){
            let productoArray=productos[i].productId;
            let QuantityArray=productos[i].quantity;
            let productIndex = cart.products.findIndex(elm=>elm.productId== productoArray);
          

            if(productIndex>=0){
           
                cart.products[productIndex].quantity= cart.products[productIndex].quantity+QuantityArray;
     
     
             }
             else {
                let newproduct={
                    productId:productoArray,
                    quantity:QuantityArray

                };
             
                cart.products.push(newproduct);
                    
             }

          }
        
       logger.informativo("cart",cart)
                     
         const result = await this.model.findByIdAndUpdate(cartId,cart,{new:true});
         return result;  
       
        } catch (error) {
         logger.error("addProduct",error.message);
         throw new Error("No se pudo agregar el producto al carrito");
         
        }
 
     };


 // metodo para agregar producto a los carritos por parametros
 async addProduct(cartId, productId){
    try {
        const cart = await this.getCartById(cartId);
        // const productExist = cart.products.find(elm=>elm.productId._id == productId);
        // console.log("productExist",productExist);
        const newProductCart = {
            productId:productId,
            quantity:1
        }
        cart.products.push(newProductCart);
        const result = await this.model.findByIdAndUpdate(cartId,cart, {new:true});
        return result;
    } catch (error) {
        logger.error(error.message);
        throw new Error("No se pudo agregar el producto al carrito");
    }
};

    // actualizar la cantidad del carrito
    async updateProductCart(cartId, productId, newQuantity){
        try {
            const cart = await this.getCartById(cartId);
            const productIndex = cart.products.findIndex(elm=>elm.productId._id == productId);
            if(productIndex>=0){
                console.log(cart.products[productIndex])
                // //si el producto existe en el carrito
                cart.products[productIndex].quantity = newQuantity;
                const result = await this.model.findByIdAndUpdate(cartId,cart, {new:true});
                return result;
            } else {
                throw new Error("El producto no se puede actualizar porque no ha sido agregado");
            }
        } catch (error) {
            logger.error("updateProductCart",error.message);
            throw new Error("No se pudo actualizar el producto al carrito");
        }
    };

    // metodo para borrar producto de un carrito
    async deleteProduct(cartId, productId){
        try {
            const cart = await this.getCartById(cartId);
            const productExist = cart.products.find(elm=>elm.productId._id == productId);
            console.log("Productid",productId);
            if(productExist){
                //si el producto existe en el carrito
                const newProducts = cart.products.filter(elm => elm.productId._id != productId);
                cart.products = newProducts;
                const result = await this.model.findByIdAndUpdate(cartId,cart, {new:true});
                return result;
            } else {
                throw new Error("El producto no se puede eliminar porque no ha sido agregado");
            }
        } catch (error) {
            logger.error("deleteProduct",error.message);
            throw new Error("No se pudo eliminar el producto del carrito");
        }
    };
    
 // metodo para borrar todos los productos de una carrito
 async deleteProductAll(cartId){
    try {
     const newProducts=[];
     const cart = await this.getCartById(cartId);
     cart.products=newProducts;
     const result = await this.model.findByIdAndUpdate(cartId,cart,{new:true});
     return result;
     
     
   
    } catch (error) {
     logger.error("deleteProduct",error.message);
     throw new Error("No se puede borrar el producto del carrito");
     
    }

 };

 


};