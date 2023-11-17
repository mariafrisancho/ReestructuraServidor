//importamos la capa de persistencia
import { productsDao } from "../persistence/index.js";

export class ProductsService {

   static getProductsPaginate=(query,options)=>{
      return productsDao.getProductsPaginate(query,options);
   }
  
     static  createProduct=(productInfo)=>{
        return  productsDao.createProduct(productInfo);
    }
     static getProducts = ()=>{
      return  productsDao.getProducts();
     }
  
     static getProductById=(productId)=>{
        return  productsDao.getProductById(productId);
     }
   
     static updateProduct=(productId,newProductInfo)=>{
        return  productsDao.updateProduct(productId,newProductInfo);
     }

     static deleteProduct=(productId)=>{
        return  productsDao.deleteProduct(productId);
     }
}