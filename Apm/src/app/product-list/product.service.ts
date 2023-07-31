import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";
@Injectable({
    providedIn:'root'//for registering root injectable
    // providers:[ProductService] for register using a particular component
})

export class ProductService{
private productUrl='api/products/products.json';
    constructor(private http:HttpClient){}
    getProducts():Observable<IProduct[]>{
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data=>console.log('All', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }
    private handleError(err: HttpErrorResponse){
        let errorMessage='';
        if(err.error instanceof ErrorEvent){
            // a client side or network error occured .Handle it accordingly.
            errorMessage=`An error occured: ${err.error.message}`;
        }
        else {
            // backend returns an unsuccessfull response code ,the response body may contain clues as to what went wrong
            errorMessage=`server returned code :${err.status}, error message is : ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(()=>errorMessage);
        }
}


// tap function is to access the observable data without modifying it !