import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  //Nodejs API
  REST_API:string = "http://localhost:9000/api";
  // Set Http Headers
  HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  constructor(private httpClient:HttpClient){}

  //Add records
  // AddData(data:Customer):Observable

  AddData(data:Customer):Observable<any>{
    let API_URL = `${this.REST_API}/addcustomer`;
    return this.httpClient.post(API_URL,data).pipe(catchError(this.handleError))
  }

  // get all records
  getCustomers(){
    return this.httpClient.get(`${this.REST_API}`);
  }

  // get single data
  getCustomer(customer_email:any): Observable<any>{
    let API_URL = `${this.REST_API}/get-customer/${customer_email}`;
    return this.httpClient.get(API_URL,{headers:this.HttpHeaders}).pipe(map((res:any)=>{
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  // Deleting Data
//   deleteData(){
//     return this.httpClient.get(`${this.REST_API}/delete-data`);
//   }


// Deleting Data
deleteData(): Observable<any>{
  let API_URL = `${this.REST_API}/delete-data`;
  const result=this.httpClient.get(API_URL, {headers: this.HttpHeaders}).pipe(catchError(this.handleError))
  // console.log("resiltt",result)
  return result;
  }

  // Error
  handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      //Handle Client Error
      errorMessage = error.error.message;
    }
    else{
      // Handle Server Error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
