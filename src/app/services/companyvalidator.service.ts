import { Injectable } from '@angular/core';
import { CompanyId } from '../models/companyid';
import { CompanyValidator } from '../models/companyvalidation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import { of } from 'rxjs';
import { inject } from '@angular/core/testing';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyvalidatorService {

  constructor(private http : HttpClient) { }

  private handleError<T> (operation : 'operation', result? : T) {
    return (error : any) => {
      console.error(error);
      return of(result as T);
    };
  }
  companyResponse : CompanyValidator = {
    Id : 0,
    Nit : 0,
    isValid : false,
    reason : '',
    code : '',
  };

  checkData (id : string) { 
    return this.http.get<CompanyValidator>('/api/Validator/'+ id);
  }

  insertData (dataCompany : Company) {
    return this.http.post<Company>('/api/Company', dataCompany);
  }
}
