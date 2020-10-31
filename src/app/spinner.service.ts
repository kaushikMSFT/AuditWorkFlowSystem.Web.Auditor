import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private count=0;
  private subject=new BehaviorSubject<string>("");
  constructor() { }

  getSpinner():Observable<string>
  {
    return this.subject.asObservable();
  }

  requestStarted()
  {
    //if(++this.count==1)
      this.subject.next("started");
  }

  requestCompleted()
  {
    //if(--this.count==0|| this.count==0)
      this.subject.next("completed");
  }

  reset()
  {
    this.subject.next("completed");
  }
}
