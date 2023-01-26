import { Severity } from "../../pacient-list/patient.model";

export class Feet {
  clientId: string;
  whichFeet: WhichFeet;
  severity: Severity;
  description: string;
  notes?: string;
  //recommendedProduct?: Product[];

  constructor(clientId: string) {
    this.clientId = clientId;
    this.whichFeet = WhichFeet.Left;
  }
}

export enum WhichFeet {
  Left = 'left-feet',
  Right = 'right-feet'
}
