//importamos la capa de persistencia
import { cartsDao } from "../persistence/index.js";

export class CartsService{
     ///metodo para realizar la populacion ingresando el id del carrito ,
    static getCartsById=(CarIId)=>{
      return cartsDao.getCartsById(CarIId);

    }
    //metodo utilizar para verificar si existe el carrito
    static getCartsByIds=(CarIId)=>{
      return cartsDao.getCartsByIds(CarIId);

    }
     // metodo que te devuelve tos los carritod
    static getCarts=()=>{
      return cartsDao.getCarts();

    }
    
    // metodo para crear carrito
    static createCart=()=>{
      return cartsDao.createCart();

    }

     /// metodo para agregar productos a los carritos con array
    static addProducts=(cartId, productos)=>{
      return cartsDao.addProducts(cartId,productos);

    }
     // metodo para agregar producto a los carritos por parametros
    static addProduct=(cartId,productId)=>{
      return cartsDao.addProduct(cartId,productId);

    }

        // actualizar la cantidad del carrito
     static updateProductCart=(cartId,productId,newQuantity)=>{
      return  cartsDao.updateProductCart(cartId,productId,newQuantity);

      }

    // metodo para borrar producto de un carrito
    static deleteProduct=(cartId, productId)=>{
      return cartsDao.deleteProduct(cartId,productId);

    }

     // metodo para borrar todos los productos de una carrito
   static  deleteProductAll=(cartId)=>{
     return cartsDao.deleteProductAll(cartId);

    }
}