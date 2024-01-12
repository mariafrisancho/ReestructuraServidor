import { app } from "../src/app.js";
import {expect} from "chai";
import supertest from "supertest";

const requester=supertest(app);

describe("Pruebas app ecommerece", function(){
    describe("Pruebas para los endpoints de ecommerce",function(){
      //Productos
        it("El endpoint POST /api/products se intenta crear un producto sin estar autenticado, va mostrar error", async function (){
            const newProduct={
                title: "Vino seco",
                description:"Vinos Seco variedad ,cepa Negra Criolla",
                price: 100,
                status: true,
                code: "VINSECOT01",
                category: "Vino",
                stock: 10
            };
            const response= await requester.post("/api/products").send(newProduct);
            //console.log(response);
            expect(response.body.status).to.be.equal("error");
            expect(response.body.message).to.be.equal("Debes estar autenticado");

        });

        // Productos
        it("El endpoint POST /api/products se intenta crear un producto sin tener permisos, va mostrar error", async function (){
            const newProduct={
                title: "Vino seco",
                description:"Vinos Seco variedad ,cepa Negra Criolla",
                price: 100,
                status: true,
                code: "VINSECOT01",
                category: "Vino",
                stock: 10
            };
            const response= await requester.post("/api/products").send(newProduct);
            //console.log(response);
            expect(response.body.status).to.be.equal("error");
            expect(response.body.message).to.be.equal("No tienes accesso");

        });

        // carts
        it("El endpoint POST /api/carts se crea un carrito, me genere propiedad _id  y array de products ", async function (){
            const newCart = {};
            const response= await requester.post("/api/carts").send(newCart);
             expect(response.body.payload).to.have.property("_id");;
             expect(Array.isArray(response.body.products)).to.be.equal(true);

        });

           // registrar usuario
           it("El endpoint POST /api/sessions , el endpoint debe registrar el usuario", async function (){
            const newUusario = {
                firts_name:"victoria",
                last_name:"Ramirez",
                age:34,
                email:"victoria@gmail.com",
                password:"coder"

            };
            const response= await requester.post("/api/sessions").send(newUusario);
            expect(response.body.status).to.be.equal("sucess");
       

        });

        it("El endpoint POST /api/sessions/login permite loguear al usuario", async function(){
            const response = await requester.post("/api/sessions/login").send({
                email:"victoria@gmail.com",
                password: "coder"
            });
            // console.log(response);
            expect(response.body.message).to.be.equal("Loggeado");
            const cookieResult = response.header['set-cookie'][0];
            // console.log(cookieResult);
            const cookieData = {
                name:cookieResult.split("=")[0],
                value: cookieResult.split("=")[1]
            };
            // console.log(cookieData);
            this.cookie=cookieData;
            expect(this.cookie.name).to.be.equal("coderCookie");
        });


    });


})