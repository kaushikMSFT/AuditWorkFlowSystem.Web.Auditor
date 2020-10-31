import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class requestInterceptorJWT implements HttpInterceptor
{
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("intercept");
        var currentUser = { token:""};
        if(sessionStorage.getItem("token")!=null)
        {
        
            currentUser.token=JSON.parse(sessionStorage.getItem("token"));
        }
        request=request.clone({
            setHeaders:{
                Authorization:"Bearer "+currentUser.token
            }
        });
        return next.handle(request);
        
    }
    
}