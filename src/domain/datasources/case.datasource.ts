import { CaseModel } from "../../data/models/case.model";
import { CaseDocument } from "../entities/case.entity";

export class CaseDataSource {
  public updateCase = async (id: string, data: Partial<CaseDocument>) => {
    await CaseModel.findByIdAndUpdate(id, {
      lat: data.lat,
      lng: data.lng,
      genre: data.genre,
      age: data.age,
      isSent: data.isSent,
    })
  }
}