import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuditPortfolio } from '../../shared/audit.model';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuditsService {

  constructor(private httpService: HttpClient) { }

  GetAll(): Observable<AuditPortfolio[]>
  {
     let audits: AuditPortfolio[]=[];
     let audit: AuditPortfolio;
    //return this.httpService.get<AuditPortfolio[]>("");
     return this.httpService.get<any[]>("https://auditorapiv1.azurewebsites.net/api/auditportfolio").pipe(map((data)=>{
        console.log(data);
        for(let i=0;i<data.length;i++)
        {
          audit=new AuditPortfolio();
          audit.AuditCode=data[i].auditPortfolioId;
          audit.AuditorFirm=data[i].auditorFirmId;
          audit.ClientFirm=data[i].clientId;
          audit.Description=data[i].description;
          audit.ReleaseDate=data[i].reportReleaseDate;
          audits.push(audit);
        }
        console.log("audits", audits, data,audits[0].AuditCode);
        return audits;
     }));
        
  }
}
