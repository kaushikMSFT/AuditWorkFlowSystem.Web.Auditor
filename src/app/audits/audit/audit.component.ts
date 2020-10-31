import { ClientFirm } from './../../shared/clientFirm.model';
import { AuditService } from './audit.service';
import { Component, OnInit, ViewChild } from '@angular/core';
//import {NgProgressRef, NgProgress} from 'ngx-progressbar'
import { NgForm } from '@angular/forms';
//import { ProgressBarService } from '../../progress-bar.service';

import { FileUploadComponent } from '../../file-upload/file-upload.component';
import { AuditPortfolio } from '../../shared/audit.model';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuditDocument } from '../../shared/audit-document.model';
import {ActivatedRoute} from '@angular/router';
//import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {
  @ViewChild("fileupload") fileupload: FileUploadComponent;
  clientFirms : ClientFirm[];
  auditService: AuditService;
  //progressRef : NgProgressRef;
  uploadInProgress: boolean;
  progress = 0;
  currentFile: File;
  //formData: { AuditCode: string; Description: string; AuditorFirm: string; ClientFirm: string; ReleaseDate: string; };
  formData : AuditPortfolio;
  selectedAuditCode: number=-1;
  selectedAuditPortfolio: AuditPortfolio;
  constructor( 
    //public authService: AuthService,
    //public progressBar: ProgressBarService,
    //public progressService: NgProgress,
    //private alertService: AlertService,
    ///private employerService: EmployerService,
     private route: ActivatedRoute,
     auditService: AuditService) {
    this.auditService=auditService;
    this.clientFirms = auditService.getClientFirms();
     console.log(this.clientFirms);
     this.uploadInProgress=false;
     console.log('inprogress',this.uploadInProgress);
     this.selectedAuditCode=-1;
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.selectedAuditCode = Number(params.get("AuditCode"));
      console.log("auditCode",this.selectedAuditCode);
    })
    this.uploadInProgress=false;
    //this.progressRef=this.progressService.ref("progress");
    
    this.formData = {
      AuditCode:'',
      Description:'',
      AuditorFirm:'0',
      ClientFirm:'0',
      ReleaseDate:'',
      Document:new AuditDocument()
      }
      console.log("selected", this.selectedAuditCode);
      if(this.selectedAuditCode!=0)
      {
        this.formData.AuditCode=this.selectedAuditCode.toFixed();
        this.auditService.getAudit(this.formData.AuditCode).subscribe(x=>{
          console.log(x);
          this.selectedAuditPortfolio=x;
          this.formData.ClientFirm=this.selectedAuditPortfolio.ClientFirm;
          this.formData.Description=this.selectedAuditPortfolio.Description;
          this.formData.Document=this.selectedAuditPortfolio.Document;
          this.formData.AuditorFirm=this.selectedAuditPortfolio.AuditorFirm;
          
        })
       
      }
      
    console.log("go", this.uploadInProgress);

  }


 
  SaveAudit()
  {
    console.log("uploading now", this.fileupload.model.file);
    this.uploadInProgress=true;
    this.progress = 0;
    let results: Observable<any>;
    this.currentFile = this.fileupload.model.file;
    this.auditService.upload(this.currentFile).subscribe(
      data => {
        this.uploadInProgress=false;
        console.log("response", data);    
        console.log("completed finally", data);
        this.SaveData();            
      },
      err => {
        this.progress = 0;
        //this.message = 'Could not upload the file!';
        console.log(err);
        this.currentFile = undefined;     
      })
      
  }

  SaveData():void
  {
    
    //this.upload();
    this.formData.Document=this.fileupload.model.file.name;
    this.formData.ReleaseDate="1/1/2021";
    console.log("Now saving formdata", this.formData);
    //this.progressRef.start();
    const createAuditObserver= {
      next: x => {
        //this.progressRef.complete();
        console.log("Audit created successfully",x);
        //this.alertService.success("Account Updated");
        //this.progressRef.started.completeLoading();
      },
      error: err => {
        //this.progressRef.set(setError();
        console.log("Unable to create audit",err);
        //this.alertService.danger("Unable to Update Account");
        //this.progressBar.completeLoading();
      }

    }
    this.auditService.Create(this.formData).subscribe(
      createAuditObserver
      );
  }

  download( docName: string): void
  {
    window.open("https://auditstoragev1.blob.core.windows.net/auditcontainer/"+docName);
  }

}

