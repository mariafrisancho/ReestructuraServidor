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

static createProducts= async(req,res,next)=>{

    try {
        const product = req.body;
   /*      const {title, description, price,status,code,category,stock} = req.body;
        if(!title || !description || !price ||!status ||!code || !category ||!stock ){
            CustomError.createError({
                name:"Create user error",
                cause: productCreateError(req.body),
                message:"Datos invalidos para crear el producto",
                errorCode: EError.INVALID_BODY_JSON
            });
        } */
        const result = await ProductsService.createProduct(product);
        res.json({status:"success", data:result});
    } catch (error) {
     
        //res.status(500).json({status:"error", message:error.message});
        next(error)
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
        const productId = req.params.pid;
        const product = await ProductsService.getProduct(productId);
        if((req.user.role === "premium" && product.owner.toString() === req.user._id.toString()) || req.user.role === "admin"){
            await ProductsService.deleteProduct(productId);
            res.json({status:"success",message:"producto eliminado"});
        } else {
            res.json({status:"error",message:"No tienes permisos para eliminar este producto"});
        }
    } catch (error) {
        res.json({status:"error",message:error.message});
    }
};


}