import { Router } from "express";
import { CasesController } from "./controller";

export class CasesRoutes {
  static get routes(): Router {
    const router = Router();
    const caseController = new CasesController();
    router.get("/", caseController.getAllCases);
    router.get("/lastweek", caseController.getLast7DaysCases);
    router.post("/", caseController.createCase);
    router.put("/:id", caseController.updateCase);
    router.delete("/:id", caseController.deleteCase);
    return router;
  }
}