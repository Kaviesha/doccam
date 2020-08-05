import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument,} from '@angular/fire/firestore';
import { Observable } from 'rxjs';



export interface Item { temp: number; }

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.css']
})
export class TempComponent implements OnInit {
  private itemDoc: AngularFirestoreDocument<Item>;
  data: Observable<any>;
  constructor(firestore: AngularFirestore) {
    this.data = firestore.collection('sensorData').doc('data').valueChanges();
  }
  
  ngOnInit(): void {
  }

}
