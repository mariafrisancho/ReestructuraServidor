// importar la capa de servicio
import { ProductsService } from "../service/products.service.js";

export class  ProductController{

 static getProducts= async(req,res)=>{
    try {
     
        const products = await ProductsService.getProducts();
        res.json({status:"success", data:products});
      
      
    } catch (error) {
        res.status(500).json({status:"error", message:error.message});
    }
};
static createProducts= async(req,res)=>{
    try {
        const product = req.body;
        const result = await ProductsService.createProduct(product);
        res.json({status:"success", data:result});
    } catch (error) {
        res.status(500).json({status:"error", message:error.message});
    }
};
static updateProduct= async(req,res)=>{
    try {
        const product = req.body;
        const productId = req.params.productId;
        const result = await ProductsService.updateProduct(productId,product);
        res.json({status:"success", data:result});
    } catch (error) {
        res.status(500).json({status:"error", message:error.message});
    }
};

static deleteProduct= async(req,res)=>{
    try {
        const productId = req.params.productId;
        const result = await ProductsService.deleteProduct(productId);
        res.json({status:"success", data:"producto eliminado"});
    } catch (error) {
        res.status(500).json({status:"error", message:error.message});
    }
};

}