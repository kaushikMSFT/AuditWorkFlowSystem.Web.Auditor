import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SpinnerService } from '../spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  showSpinner=false;
  constructor(private spinner:SpinnerService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.init();
  }

  init():void{
    this.spinner.getSpinner().subscribe(status=>{
      this.showSpinner=status=="started";
    })
  }

}
