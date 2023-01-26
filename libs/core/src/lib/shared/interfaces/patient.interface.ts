import { HealthCondition, PersonalInfo, Visit } from "../../pacient-list/patient.model";
import { generateId } from "../utils";
import { Feet } from "./diseases.interface";

export class ClientModel {
  id: string;
  personalInfo: PersonalInfo;
  feet: Feet[];

  healtCondition: HealthCondition[];
  allVisits: Visit[];
  photos?: [];

  gdpr: boolean;

  constructor() {
    this.id = generateId();
    this.personalInfo = new PersonalInfo();
    this.feet = [new Feet(this.id), new Feet(this.id)]
  }
}

