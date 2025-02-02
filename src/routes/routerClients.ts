import * as express from "express";
import * as ClientController from "../controllers/ClientController";
import { verify } from "../middleware/verify"

export const routerClients = express.Router();
 
routerClients.post("/registration", ClientController.registration);
routerClients.get("/getAll", verify("admin"), ClientController.getAllClients);
routerClients.delete("/delete/:id", verify("client"), ClientController.deleteClient);
routerClients.post("/change", verify("client"), ClientController.change);