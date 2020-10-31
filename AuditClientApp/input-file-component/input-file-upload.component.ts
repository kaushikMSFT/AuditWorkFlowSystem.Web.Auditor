import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-input-file-upload',
  templateUrl: './input-file-upload.component.html',
  styleUrls: ['./input-file-upload.component.css']
})
export class InputFileUpload implements OnInit {

 

  ngOnInit(): void {
    console.log(this.fileInput);
  }

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef<HTMLInputElement>;

  constructor() {}

  onSelected(files: FileList): void {
    //this.blobState.uploadItems(files);
    this.fileInput.nativeElement.value = '';
  }

  showFileDialog(): void {
    this.fileInput.nativeElement.click();
  }

}
