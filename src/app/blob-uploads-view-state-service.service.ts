import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlobUploadsViewStateServiceService {
  private uploadQueueInner$ = new Subject<FileList>();
  constructor() { }
}
