import { Severity } from "../../pacient-list/patient.model";

export interface Diseases {
  id: string;
  name: string;
  severity: Severity;
  description: string;
  //recommendedProduct?: Product[];
}
