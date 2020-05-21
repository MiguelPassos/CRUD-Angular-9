import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    baseUrl = 'http://localhost:3001/products';

    constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) { }

    showMessage(msg: string, isError: boolean = false): void {
        this.snackBar.open(msg, '', {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: isError ? ["msg-error"] : ["msg-success"]
        });
    }

    errorHandler(msg: any): Observable<any> {
        this.showMessage(msg, true);
        return EMPTY;
    }

    createProduct(product: Product): Observable<Product> {
        return this.httpClient.post<Product>(this.baseUrl, product).pipe(map((obj) => obj), catchError(() => this.errorHandler("Falha ao criar o produto!")));
    }

    readProducts(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(this.baseUrl).pipe(map((obj) => obj), catchError(() => this.errorHandler("Falha ao obter os produtos!")));
    }

    readProductById(id: string): Observable<Product> {
        const url = `${this.baseUrl}/${id}`;
        return this.httpClient.get<Product>(url).pipe(map((obj) => obj), catchError(() => this.errorHandler("Falha ao obter o produto!")));
    }

    updateProduct(product: Product): Observable<Product> {
        const url = `${this.baseUrl}/${product.id}`;
        return this.httpClient.put<Product>(url, product).pipe(map((obj) => obj), catchError(() => this.errorHandler("Falha ao atualizar o produto!")));
    }

    deleteProduct(product: Product): Observable<Product> {
        const url = `${this.baseUrl}/${product.id}`;
        return this.httpClient.delete<Product>(url).pipe(map((obj) => obj), catchError(() => this.errorHandler("Falha ao excluir o produto!")));
    }
}
