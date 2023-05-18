import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';

import { ClientService } from '../../shared/services/patient-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ITextBoxParams } from '@pacient-card/reusable-ui';
import { PersonalInfo } from '../../pacient-list/patient.model';
import { take } from 'rxjs';
import { SessionDataService } from '../../shared/services/session-storage.service';

@Component({
  selector: 'pcard-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientCreateComponent {
  protected clientForm: FormGroup = this.fb.group({
    name: [''],
    phone: [''],
  });
  protected nameConfig: ITextBoxParams = {
    label: 'Meno',
    placeholder: 'Zadaj meno',
    required: true,
  }
  protected phoneConfig: ITextBoxParams = {
    label: 'Telefónne číslo',
    placeholder: 'Zadaj telefónne číslo',
    required: true,
  }
  protected personalInfo: PersonalInfo = {
    name: '',
    phone: '',
  };

  constructor(private clientService: ClientService,
              private sessionService: SessionDataService,
              private router: Router,
              private cd: ChangeDetectorRef,
              private fb: FormBuilder) {
               }

  protected onSubmit() {
    this.clientService.createClient(this.personalInfo).pipe(take(1)).subscribe((client)=> {
      this.personalInfo.id = client.id;
      this.sessionService.set('client', this.personalInfo);
      this.router.navigateByUrl(`/client-create/menu/${client.id}`);
    });
  }

  protected nameChanged(event: string) {
    this.personalInfo.name = event;
    this.cd.markForCheck();
  }

  protected phoneChanged(event: string) {
    this.personalInfo.phone = event;
    this.cd.markForCheck();
  }

  protected onBack() {
    console.log('back');
  }
}
