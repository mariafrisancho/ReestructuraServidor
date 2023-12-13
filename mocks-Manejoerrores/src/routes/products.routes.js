import { Router } from "express";
// importar la capa de controlador
import { ProductController } from "../controller/products.controller.js";
import {checkRole ,isAuth} from "../middlewares/auth.js"

const router = Router();

router.get("/",ProductController.getProducts );
router.post("/",isAuth, checkRole(["admin","superadmin"]),ProductController.createProducts);
router.put("/:productId",ProductController.updateProduct);
router.delete("/:productId",ProductController.deleteProduct);

export { router as productsRouter};