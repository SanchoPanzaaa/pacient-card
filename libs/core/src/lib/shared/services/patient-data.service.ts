import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from "firebase/compat/app";
import { from, Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { ClientModel } from '../interfaces/patient.interface';
import { PersonalInfo } from '../../pacient-list/patient.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private authService: AuthService, private db: AngularFirestore) {}

  createClient(data: Partial<PersonalInfo>) {
    return from(this.db.collection('clients').add({
      ...data,
    }))
  }

  /**
   * Delete patient
   */
  deletePatient(patientId: string) {
    return this.db
      .collection('patients')
      .doc(patientId)
      .delete();
  }
  /**
   * Get all patients in the system
   */
  getAllClients(): Observable<ClientModel[]> {
    return this.db.collection<ClientModel>('clients').valueChanges()
  }

  /**
   * Run a batch write to change the priority of each board for sorting
   */
  sortClients(patients: ClientModel[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = patients.map(patient => db.collection('patients')
      .doc(patient.id));
    refs.forEach((ref, idx) =>
      batch.update(ref, { priority: idx }));
    batch.commit();
  }

  getClientById(id: string): Observable<PersonalInfo | undefined> {
    return this.db.collection<PersonalInfo | undefined>('clients').doc(id).valueChanges();
  }
}
