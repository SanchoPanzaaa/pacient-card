import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClientModel } from '../../shared/interfaces/patient.interface';
import { ClientService } from '../../shared/services/patient-data.service';
import { CreateNewFormDefault, CreateNewFormStepper } from './create-new-form.model';

@Component({
  selector: 'pcard-create-client',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss'],
})
export class ClientCreateComponent {
  createNewProps: CreateNewFormStepper[] = CreateNewFormDefault;
  client: ClientModel = new ClientModel();
  constructor(private clientService: ClientService) {}

  execute(form: FormGroup) {
    this.client.personalInformations.name = form.get('name')?.value;;
    this.clientService.createNewPatient(this.client).subscribe(data => console.log(data));
  }
}
