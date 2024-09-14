import { Request, Response } from "express";
import { CaseModel } from "../../data/models/case.model";

export class CasesController {
  public getAllCases = async (req: Request, res: Response) => {
    try {
      const cases = await CaseModel.find();
      return res.json(cases);
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }

  public getLast7DaysCases = async (req: Request, res: Response) => {
    try {
      const cases = await CaseModel.find({
        creationDate: {
          $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
        },
      });
      return res.json(cases);
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }

  public createCase = async (req: Request, res: Response) => {
    const { lat, lng, genre, age } = req.body;
    try {
      const newCase = await CaseModel.create({ lat, lng, genre, age });
      return res.json(newCase)
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }

  public updateCase = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { lat, lng, genre, age } = req.body;
    try {
      const updatedCase = await CaseModel.findByIdAndUpdate(id, { lat, lng, genre, age });
      return res.json(updatedCase);
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }

  public deleteCase = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await CaseModel.findByIdAndDelete(id);
      return res.json({ message: "Case deleted" });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
}
