import {faker} from "@faker-js/faker";

const { database, commerce, string,helpers} = faker;

//funcion para generar un producto
export const generateProduct = ()=>{
    return {
        id: database.mongodbObjectId(),
        title: commerce.product(),
        description: commerce.productDescription(),
        price: parseFloat(commerce.price()),
        status:"true",
        code: string.alphanumeric(5, { casing: 'upper' }),
        category: helpers.arrayElement(['Vino', 'Pisco', 'Aguardiente']),
        stock: string.numeric(2)
      
       
       
    }
};

