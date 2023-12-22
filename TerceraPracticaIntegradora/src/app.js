import express from "express";
import { Server } from "socket.io";
import session from "express-session";
import MongoStore from "connect-mongo";

import { __dirname } from "./utils.js";
import path from "path";

import { engine } from "express-handlebars";
import { connectDB } from "./config/dbConnection.js";  // coneccion base de datos

import passport from "passport";

import { initializePassport } from "./config/passport.config.js";

import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { sesionsRouter } from "./routes/sessions.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { mockingproductsRouter } from "./routes/mockingproducts.routes.js";

import { config } from "./config/config.js";
import { ProductsService } from "./service/products.service.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { logger } from "./helpers/logger.js";

const port = 8080;
const app = express();

const httpServer=app.listen(port,()=>logger.informativo(`servidor ejecutandose en el puerto  ${port}`));
// servidor de websocket
const io=new Server(httpServer);



//middlewares
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//conexión base de datos
connectDB();

//configuración de handlebars motor de plantillas
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

// configurar la session
app.use(session({
    store:MongoStore.create(
        {
            ttl:1000,
            mongoUrl:config.mongo.url
        }

    ),
    secret:config.server.secretSession,
    resave:true,
    saveUninitialized:true
})

);

// configurar passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());


// routes
app.use(viewsRouter);
app.use("/api/sessions",sesionsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/mockingproducts", mockingproductsRouter);
app.use(errorHandler);

// socket server
io.on("connection",async(socket)=>{
  console.log("cliente conectado");
  const products=await ProductsService.getProducts()
  socket.emit("productsArray",products);

  // recibir el producto del socket del cliente
  socket.on("addProduct",async(productData)=>{
    const result=await ProductsService.addProduct(productData);
    const products=await ProductsService.getProducts();
    io.emit("productsArray",products);

  });

  // Eliminar producto
  socket.on("Deleteproduct",async(productId)=>{
    const result=await ProductsService.deleteProduct(productId);
    const products=await ProductsService.getProducts();
    io.emit("productsArray",products);

  });

})