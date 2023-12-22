import { Router } from "express";
import { checkRole } from "../middlewares/auth";

const router=  Router();
    router.put("premium:uid",checkRole(["admin"]),UsersController,modifyrole)
    {

    }