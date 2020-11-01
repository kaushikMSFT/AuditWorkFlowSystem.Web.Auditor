import { ClientFirm } from './../../shared/clientFirm.model';
import { AuditPortfolio } from './../../shared/audit.model';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuditDocument } from '../../shared/audit-document.model';



@Injectable({
  providedIn: 'root'
})
export class AuditService {
  baseUrl_document="https://documentapiv1.azurewebsites.net"//"https://localhost:5007";
  baseUrl_audit = "https://auditorapiv1.azurewebsites.net";//"https://localhost:5005";
  //https://auditorapi20201026183324.azurewebsites.net/api/auditportfolio
  constructor(private httpService: HttpClient) { }
  //formData : AuditPortfolio
  Create(formData: AuditPortfolio)
  {
      console.log("Calling create rest service");
      //formData = auditPortfolio;
      const headers = new Headers({
        'Content-Type': 'application/json'
      });
  
      return this.httpService
        .post<AuditPortfolio>(`${this.baseUrl_audit}/api/AuditPortfolio`, formData);
      
        //return this.httpService
       // .post("https://ujpwdxg8hi.execute-api.ap-south-1.amazonaws.com/v2", "");  
       // .pipe(catchError(this.handleError));
    
  }

  upload(currentFile: File):Observable<any> 
  {
      
      const data: FormData = new FormData();
  
      data.append("file", currentFile, currentFile.name);
      console.log("form data: ",data, currentFile, currentFile.name);
      const req = new HttpRequest('POST', `${this.baseUrl_document}/api/Document`, data, {
       
        //reportProgress: true,
        
        responseType: 'json'
      }
      
      );
  
      //return this.httpService.request(req);
      return this.httpService.post(`${this.baseUrl_document}/api/Document`,data,{responseType: 'json'});
    }
  

  getAudits()
    {
      //return this.httpService()
       return ["audit1", "audit2", "audit3"];
    }

  getAudit(auditCode: string): Observable<AuditPortfolio>
  {
    let audit:AuditPortfolio=new AuditPortfolio();
    return this.httpService.get<any>(`${this.baseUrl_audit}/api/AuditPortfolio/`+ auditCode, {responseType: 'json'} ).pipe
    (map(auditData=>{
     
      audit.ClientFirm = auditData.clientId;
      audit.Document=new AuditDocument();
      audit.Document.Name=auditData.document;
      audit.Description=auditData.description;
      audit.AuditorFirm=auditData.auditorFirmId;
      console.log("audit",auditData);
      return audit; 
    }))
  }

  getClientFirms()
  {
    return [{ ClientFirmCode: "1", Name:"Oracle"}];
      //return httpService.get("https://localhost:5001/api/ClientAPI").subscribe(response=>{
      
      //console.log(response);
  //});
  }
}
