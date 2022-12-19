import { HealthProblem, PersonalInformations, Visit } from "../../pacient-list/patient.model";
import { Diseases } from "./diseases.interface";

export interface PatientModel {
  id: string;
  personalInformations: PersonalInformations;

  healthProblems: HealthProblem[];
  diseases: Diseases[];

  allVisits: Visit[];
  photos?: [];

  gdpr: boolean;
}
