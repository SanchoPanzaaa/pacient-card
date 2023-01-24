import { HealthProblem, PersonalInformations, Visit } from "../../pacient-list/patient.model";
import { Diseases } from "./diseases.interface";

export class ClientModel {
  id: string;
  personalInformations: PersonalInformations;

  healthProblems: HealthProblem[];
  diseases: Diseases[];

  allVisits: Visit[];
  photos?: [];

  gdpr: boolean;

  constructor() {
    this.id = '';
    this.personalInformations = new PersonalInformations();
  }
}
