import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from "firebase/compat/app";
import { from, map, Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { ClientModel } from '../interfaces/patient.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private authService: AuthService, private db: AngularFirestore) {}

  createNewPatient(data: ClientModel) {
    return from(this.db.collection('patients').add({
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
  getAllPatients(): Observable<ClientModel[]> {
    return this.db.collection<ClientModel>('patients').valueChanges()
  }

  /**
   * Run a batch write to change the priority of each board for sorting
   */
  sortPatients(patients: ClientModel[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = patients.map(patient => db.collection('patients')
      .doc(patient.id));
    refs.forEach((ref, idx) =>
      batch.update(ref, { priority: idx }));
    batch.commit();
  }
}
