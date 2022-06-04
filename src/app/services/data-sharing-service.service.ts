import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingServiceService {

  constructor() { }
  private componentUpdated = new Subject<any>(); //need to create a subject
    
  sendUpdate(isUpdated: boolean) { //the component that wants to update something, calls this fn
      this.componentUpdated.next(isUpdated); //next() will feed the value in Subject
  }

  getUpdate(): Observable<any> { //the receiver component calls this function 
      return this.componentUpdated.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }
}
