import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from "firebase/compat/app";
import { from, map, Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { PatientModel } from '../../pacient-list/pacient-list.component';

@Injectable({
  providedIn: 'root'
})
export class PatientDataService {
  constructor(private authService: AuthService, private db: AngularFirestore) {}

  createNewPatient(data: PatientModel) {
    return from(this.db.collection('patients').add({
      ...data,
    })).pipe(
      map( reference => {
        console.log(reference)
      })
    ).subscribe()
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
  getAllPatients(): Observable<PatientModel[]> {
    return this.db.collection<PatientModel>('patients').valueChanges()
  }

  /**
   * Run a batch write to change the priority of each board for sorting
   */
  sortPatients(patients: PatientModel[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = patients.map(patient => db.collection('patients')
      .doc(patient.id));
    refs.forEach((ref, idx) =>
      batch.update(ref, { priority: idx }));
    batch.commit();
  }
}
