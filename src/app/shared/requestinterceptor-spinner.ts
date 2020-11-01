import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { SpinnerService } from "../spinner.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class requestInterceptorSpinner implements HttpInterceptor
{

    constructor(private spinner:SpinnerService)
    {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("spinenr intercept");
        
        this.spinner.requestStarted();
        return next.handle(request).pipe(tap(
            event=>{
            if(event instanceof HttpResponse)
                this.spinner.requestCompleted();
            },
            (error : HttpErrorResponse)=>{

            this.spinner.reset();
            throw error;
            }
                
        ))
        
    }


    
}