


export interface Corectors {
  id:string;
  name: string;
  usage: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  brand: string;
  price: number;

  usage: string;
  inWarehouse: number; // how Products of this brand I keep
}

export interface HealthProblem {
  id: string;
  name: string;
  severity: Severity;
}


export class PersonalInformations {
  name: string;
  phone: string;
  email: string;
  profession: Profession;
  weight: number;
  height: number;
  birthDate: Date;

  constructor() {
    this.name = '';
  }
}

export enum Profession {

}

export enum Severity {
  Minor = 'minor',
  Medium = 'medium',
  Critical = 'critical',
}

export interface Visit {
  id: string;
  duration: number; // timestamp
  date: Date;

}

export const PatientColumnNames = [
  'Meno',
  'Posledná návšteva',
  'Problem',
  'Profesia',
  'Email',
]
export interface TableHeader {
  key: string;
  label: string;
  hidden: boolean;
  className?: string;
}

export const tableDefPatient: TableHeader[] = [
  {
    key: 'name',
    label: 'Meno',
    hidden: true,
  },    {
    key: 'visits[0]',
    label: 'Posledná návšteva',
    hidden: true,
  },    {
    key: 'disease.name',
    label: 'Problem',
    hidden: true,
  },    {
    key: 'proffesion',
    label: 'Profesia',
    hidden: true,
  },{
    key: 'email',
    label: 'Email',
    hidden: true,
  },
]

export const detailPatientLabel: LabeledValue[] = [
  {
    label: 'Meno',
    value: 'name',
  },
  {
    label: 'Email',
    value: 'email',
  },
  {
    label: 'Profesia',
    value: 'profession',
  },
  {
    label: 'Váha',
    value: 'weight',
  },
  {
    label: 'Výška',
    value: 'height',
  },
  {
    label: 'Dátum narodenia',
    value: 'birthDate',

  },
  {
    label: 'Telefon',
    value: 'phone',

  },

]

export interface LabeledValue {
  label: string;
  value: string;
}
