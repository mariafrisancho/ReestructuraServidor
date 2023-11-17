
import { ProductsManagerMongo } from "./managers/mongo/ProductsManagerMongo.js";
import { CartsManagerMongo } from "./managers/mongo/cartsManagerMongo.js";
import { UsersManagerMongo } from "./managers/mongo/usersManagerMongo.js";

// capa de persistencia para productos
export const productsDao = new ProductsManagerMongo();
// capa de persistencia para los carritos
export const  cartsDao = new CartsManagerMongo();
// capa de persistencia para los usuarios
export const usersDao =new UsersManagerMongo();