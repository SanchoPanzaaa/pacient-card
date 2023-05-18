import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../shared/services/patient-data.service';
import { SessionDataService } from '../../shared/services/session-storage.service';
import { Observable } from 'rxjs';
import { PersonalInfo } from '../../pacient-list/patient.model';

@Component({
  selector: 'pcard-client-menu',
  templateUrl: './client-menu.component.html',
  styleUrls: ['./client-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientMenuComponent {
  private client$: Observable<PersonalInfo | undefined>;
  private clientId: string | undefined | null;

  protected configs: any[] = [
    {
      label: 'Pridat novu navstevu',
      route: '/add-visit',
    },
    {
      label: 'Pridat nohy',
      route: '/add-feet',
    },
    {
      label: 'Zoznam navstev',
      route: '/visit-list',
    },
    {
      label: 'Pridat zdraavotny stav',
      route: `/health-status`,
    },


  ];

  constructor(private clientService: ClientService,
              private sessionService: SessionDataService,
              private route: ActivatedRoute,
              private router: Router) {
                  this.clientId = this.route.snapshot.paramMap.get('id');
              }

  protected onClick(route: string) {
    this.router.navigateByUrl(`/client-create/menu/${this.clientId}${route}`)
  }
}
