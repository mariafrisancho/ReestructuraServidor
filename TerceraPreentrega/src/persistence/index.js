
import { ProductsManagerMongo } from "./managers/mongo/ProductsManagerMongo.js";
import { CartsManagerMongo } from "./managers/mongo/cartsManagerMongo.js";
import { UsersManagerMongo } from "./managers/mongo/usersManagerMongo.js";
import { TicketManagerMongo } from "./managers/mongo/ticketsManagerMongo.js";

// capa de persistencia para productos
export const productsDao = new ProductsManagerMongo();
// capa de persistencia para los carritos
export const  cartsDao = new CartsManagerMongo();
// capa de persistencia para los usuarios
export const usersDao =new UsersManagerMongo();
// capa de persistencia de lo stickets
export const ticketDao=new TicketManagerMongo();