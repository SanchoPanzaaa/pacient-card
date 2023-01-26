import { FormControl, FormGroup } from "@angular/forms";

export class CreateNewFormStepper {
  step: number;
  label: string;
  key: string;
  form: FormGroup;
  placeholder?: string;
}

export const CreateNewFormDefault: CreateNewFormStepper[] = [
  {
    step : 1,
    label: 'Zadaj meno klienta',
    key: 'name',
    form: new FormGroup({
      'name': new FormControl()
    }),
    placeholder: 'Meno',
  },
  {
    step : 2,
    label: 'Profesia',
    key: 'profession',
    form: new FormGroup({
      'profession': new FormControl()
    }),
    placeholder: 'Profesia',
  },
  {
    step : 3,
    label: 'Ľavá noha',
    key: 'feet',
    form: new FormGroup({
      'feet': new FormControl()
    }),
    placeholder: 'Nohy',
  },

]
