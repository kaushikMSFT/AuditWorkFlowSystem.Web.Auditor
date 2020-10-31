import { Component, OnInit } from '@angular/core';
import { loginData } from '../shared/login.model';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUserName:string;
  formData:loginData;
  
  constructor(private loginService:LoginService, private router:Router ){ 
    
  }

  ngOnInit(): void {
    this.formData = {
      Email:'',
      passWord:''
    }
  }

  login(form: NgForm): void{
    this.loginService.login(this.formData).subscribe(
      (user)=>
      {
        this.currentUserName=user;
        //form.resetForm();
        console.log(this.currentUserName);
        this.router.navigateByUrl("Audits");
      },
      (error)=>
      {
        console.log("Error", error);
      }
      
      )
     
  }
}
