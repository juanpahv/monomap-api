import { Document } from "mongoose";

export interface Case {
  lat: number;
  lng: number;
  genre: string;
  age: number;
  isSent: boolean;
  creationDate: Date;
}

export interface CaseDocument extends Case, Document {}