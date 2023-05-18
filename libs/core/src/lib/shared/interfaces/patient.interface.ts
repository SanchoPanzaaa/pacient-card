import { HealthCondition, PersonalInfo, Visit } from "../../pacient-list/patient.model";
import { generateId } from "../utils";
import { Feet } from "./diseases.interface";

export interface ClientModel {
  id: string;
  personalInfo: PersonalInfo;
  feet: Feet[];

  healtCondition: HealthCondition[];
  allVisits: Visit[];
  photos?: [];

  gdpr: boolean;
}

