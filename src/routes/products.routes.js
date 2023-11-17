import { Router } from "express";
// importar la capa de controlador
import { ProductController } from "../controller/products.controller.js";

const router = Router();

router.get("/",ProductController.getProducts );
router.post("/",ProductController.createProducts);
router.put("/:productId",ProductController.updateProduct);
router.delete("/:productId",ProductController.deleteProduct);

export { router as productsRouter};