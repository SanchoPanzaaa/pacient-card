


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


export interface PersonalInformations {
  name: string;
  phone: string;
  email: string;
  profession: Profession;
  weight: number;
  height: number;
  birthDate: Date;
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
  className?: string;
}

export const tableDefPatient: TableHeader[] = [
  {
    key: 'name',
    label: 'Meno',
  },    {
    key: 'visits[0]',
    label: 'Posledná návšteva',
  },    {
    key: 'disease.name',
    label: 'Problem',
  },    {
    key: 'proffesion',
    label: 'Profesia',
  },{
    key: 'email',
    label: 'Email',
  },
]

export const detailPatientLabel: LabeledValue[] = [
  {
    label: 'Meno',
    value: 'name',
    type: 'string',
  },
  {
    label: 'Email',
    value: 'email',
    type: 'string',
  },
  {
    label: 'Profesia',
    value: 'profession',
    type: 'Proffesion',
  },
  {
    label: 'Váha',
    value: 'weight',
    type: 'number',
  },
  {
    label: 'Výška',
    value: 'height',
    type: 'number',
  },
  {
    label: 'Dátum narodenia',
    value: 'birthDate',
    type: typeof Date,
  },
  {
    label: 'Telefon',
    value: 'phone',
    type: 'string',
  },

]

export interface LabeledValue {
  type: string;
  label: string;
  value: string;
}
