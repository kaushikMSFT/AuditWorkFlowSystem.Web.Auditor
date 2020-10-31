import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
@Output() fileBrowsed = new EventEmitter();
model : any = []
  constructor() { }

  ngOnInit(): void {
    console.log("fileupload init");
  }

  OnFileChanged(e): void{
    this.model.file = e.target.files[0];
    console.log("file changed...emitting now");
    this.fileBrowsed.emit({e});
    console.log(e, this.model);
  }
}
