import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument,} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item { htbeat: number; }

@Component({
  selector: 'app-heartbeat',
  templateUrl: './heartbeat.component.html',
  styleUrls: ['./heartbeat.component.css']
})
export class HeartbeatComponent implements OnInit {
private itemDoc: AngularFirestoreDocument<Item>;
  hb: Observable<any>;
  constructor(firestore: AngularFirestore) {
    this.hb = firestore.collection('sensorData').doc('heart').valueChanges();
  }
  
  ngOnInit(): void {
    console.log(this.hb)
  }
}
