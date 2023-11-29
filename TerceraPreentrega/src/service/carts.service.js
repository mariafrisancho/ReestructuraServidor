//importamos la capa de persistencia
import { cartsDao , ticketDao } from "../persistence/index.js";

export class CartsService{

  
     // metodo que te devuelve tos los carritod
    static getCarts=()=>{
      return cartsDao.getCarts();

    }
    static getCartById = (cartId)=>{
      return cartsDao.getCartById(cartId);
  };
    
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

    // metodo para crear tickets de compra

    static createTickets=(ticketsinfo)=>{
      return ticketDao.createTickets(ticketsinfo);
    }
}