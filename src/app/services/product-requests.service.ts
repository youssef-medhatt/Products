import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from '../types/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductRequestsService {
  http = inject(HttpClient);
  constructor() {}
  getProducts(): Observable<any>{
    return this.http.get('https://dummyjson.com/products');
  }
  
  getProduct(id : string): Observable<any>{
    return this.http.get(`https://dummyjson.com/products/${id}`);
  }
}
