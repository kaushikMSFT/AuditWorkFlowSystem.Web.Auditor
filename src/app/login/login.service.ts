import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { loginData } from '../shared/login.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUserName:string;
  httpService: HttpClient;
  baseUrl_login: string;
  constructor( private httpService1 :HttpClient, private httpBackend: HttpBackend) {
    this.baseUrl_login="https://IdentityAPIv1.azurewebsites.net";
   }

  login(data: loginData):Observable<string>
  {
    this.httpService=new HttpClient(this.httpBackend);
    console.log("logindata",data);
    return this.httpService.post<any>(`${this.baseUrl_login}/api/Identity/login`,data,{responseType:"json"}).pipe(map(
      loginResponse=>{
        this.currentUserName=data.Email;
        sessionStorage.setItem("token", JSON.stringify(loginResponse.token));
        console.log(loginResponse);
        return this.currentUserName;
      }
    ));
  }
}
