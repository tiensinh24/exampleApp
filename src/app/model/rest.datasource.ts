import { InjectionToken, Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "./product.model";
import { Observable } from "rxjs/Observable";

export const REST_URL = new InjectionToken("rest_url");

@Injectable()
export class RestDataSource {

  constructor(
    private http: HttpClient,
    @Inject(REST_URL) private url: string
  ) { }

  getData(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/${id}`);
  }
}
