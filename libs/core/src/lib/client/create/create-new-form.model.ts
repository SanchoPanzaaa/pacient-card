import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

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
    key: 'left-feet',
    form: new FormGroup({
      'left-feet': new FormControl()
    }),
    placeholder: 'meno',
  },
  {
    step : 4,
    label: 'Pravá noha',
    key: 'right-feet',
    form: new FormGroup({
      'right-feet': new FormControl()
    }),
    placeholder: 'meno',
  },

]
