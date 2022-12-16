export interface PatientModel {
  id: string;
  personalInformations: PersonalInformations;


  diseases: Diseases[];
  lastVisit: Visit;
  allVisits: Visit[];

  gdprSuccess: boolean;
}

export interface PersonalInformations {
  firstName: string;
  lastName: string;
  contact: number | string;
  email: string;
  profession: Profession;
  weight: number;
  height: number;
}

export enum Profession {

}

export enum Severity {
  Minor = 'minor',
  Medium = 'medium',
  Critical = 'critical',
}

export interface Diseases {
  id: string;
  name: string;
  severity: Severity;
  description: string;
  examples?: string[];
  medicament?: string[];
}

export interface Visit {
  id: string;
  lastVisit: Date;
  totalAmount: number;
}

export const PatientColumnNames = [
  'firstName',
  'lastName',
  'lastVisit',
  'visitsCounter',
  'email',
]

