import { Router } from "express";
import { cartsController } from "../controller/carts.controller.js";

const router = Router();

// Endpoint devuelve  todos los carritos
router.get("/",cartsController.getCarts);
//Endpoint muestra un carrito ingresando el id
router.get("/:cid",cartsController.getCart);


// Endpoint crea carritos
router.post("/",cartsController.createCart);


// Endpoint actualiza carrito con arreglo de productos

router.put("/:cid", cartsController.addProducts);

// agrega productos  a los carritos por req.parametros
router.put("/:cid/product/:pid", cartsController.addProductToCart);

// Endpoint actualiza cantidad de un producto de un carrito....
router.put("/:cid/products/:pid",cartsController.updateProductCart)

// Endpoint elimina producto seleccionado de un carrito

router.delete("/:cid/products/:pid",cartsController.deleteProduct);

// endpoint elimina los productos de un carrito
router.delete("/:cid/",cartsController.deleteProductAll);

router.post("/:cid/purchase", cartsController.purchaseCart);


export { router as cartsRouter};