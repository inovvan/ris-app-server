import * as express from "express";
import * as SiteAccordanceController from "../controllers/SiteAccordanceController";
import { verify } from "../middleware/verify";

export const routerSiteAccordances = express.Router();

routerSiteAccordances.post("/add", SiteAccordanceController.add);
routerSiteAccordances.get("/getAllByPeriodAndRiver", SiteAccordanceController.getAllByPeriodAndRiver);
routerSiteAccordances.get("/getAll", SiteAccordanceController.getAll);