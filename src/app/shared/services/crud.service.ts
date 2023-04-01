import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  url = environment.apiUrl;
  shippingUrl = environment.shippingApi;

  constructor(private http: HttpClient) { }

  post(path, body: any | null, options?: any): Observable<any> {
    return this.http.post(`${this.url}${path}`, body, options);
  }

  get(path, params?:any): Observable<any> {
    return this.http.get(`${this.url}${path}`, {responseType: 'json',params})
  }

}
