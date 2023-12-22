export const productCreateError = (product)=>{
    return `
        Todos los campos son obligatorios,
        Listado de campos obligatorios:
        Title: Este campo debe ser de tipo string, y se recibio ${product.title},
        description: Este campo debe ser de tipo string, y se recibio ${product.description},
        price: Este campo debe ser tipo numerico, y se recibio ${product.price},
        status: Este campo debe ser tipo boolean, y se recibio ${product.status},
        code: Este campo debe ser de tipo string, y se recibio ${product.code},
        category: Este campo debe ser de tipo string, y se recibio ${product.category},
        stock: Este campo debe ser de tipo numerico, y se recibio ${product.stock},
      
    `
};

