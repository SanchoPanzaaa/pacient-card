import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ClientModel } from '../../shared/interfaces/patient.interface';
import { DbSession } from '../../shared/models/db-session.enum';
import { SessionDataService } from '../../shared/services/session-storage.service';
import { setFormByModelProperties, updateModel } from '../../shared/utils';
import { CreateNewFormDefault, CreateNewFormStepper } from './create-new-form.model';

@Component({
  selector: 'pcard-create-client',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss'],
})
export class ClientCreateComponent implements OnInit {
  @ViewChild('stepper', {static: false}) private stepper: MatStepper;

  protected createNewProps: CreateNewFormStepper[] = CreateNewFormDefault;
  protected client: ClientModel = new ClientModel();;
  protected currentStep: number;

  constructor(private sessionService: SessionDataService) {
    const sessionData = this.sessionService.get(DbSession.Client);

    if(sessionData) {
      this.client = sessionData;
      this.setForm(this.client, this.createNewProps);
    }
  }

  ngOnInit(): void {
      this.currentStep = +this.sessionService.get(DbSession.Step);
  }

  execute(value: string, key: string, step: number) {
    this.client = updateModel(this.client, key, value);

    this.sessionService.set(DbSession.Client, this.client);
    this.sessionService.set(DbSession.Step, step.toString());

    if(step === 3) {
      this.sessionService.clearAll();
      // TODO: set up the structure for firestore
      //       update the service for storing data
      //       adjust the execute function call, to create client in database
    }
  }

  setForm(clientModel: ClientModel, formStepper: CreateNewFormStepper[]) {
      formStepper.forEach(step => {
        setFormByModelProperties(clientModel, step.key, step.form);
      })
    }
}


