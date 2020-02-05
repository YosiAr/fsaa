import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }
  getUserData():Observable<any>{
    // return this.http.get('https://storage.googleapis.com/static.aoni.io/demo/user.json');
    return this.http.get('http://localhost:3000/api/data');
  }
}
