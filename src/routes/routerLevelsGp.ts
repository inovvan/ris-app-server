import * as express from "express";
import * as LevelsGpController from "../controllers/LevelsGpController";
import { verify } from "../middleware/verify"

export const routerLevelsGp = express.Router();
 
routerLevelsGp.get("/getAll", LevelsGpController.getAll);
routerLevelsGp.get("/getAllByHydropost", LevelsGpController.getAllByHydropost);
routerLevelsGp.post("/add", verify("operator"), LevelsGpController.add);
routerLevelsGp.post("/change", verify("operator"), LevelsGpController.change);
routerLevelsGp.delete("/delete/:id", verify("operator"), LevelsGpController.deleteById);
routerLevelsGp.get("/getAllByDate", LevelsGpController.getAllByDate);
routerLevelsGp.get("/getAllByPeriod", LevelsGpController.getAllByPeriod);
routerLevelsGp.get("/getAllByPeriodAndRiver", LevelsGpController.getAllByPeriodAndRiver);