import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { ProductCreateModalComponent } from 'src/app/components/product/product-create-modal/product-create-modal.component';
import { Product } from 'src/app/components/product/product.model';
import { ProductService } from 'src/app/components/product/product.service';

@Component({
    selector: 'app-product-crud',
    templateUrl: './product-crud.component.html',
    styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements OnInit {

    products: Product[];

    constructor(public dialog: MatDialog, private productService: ProductService, private headerService: HeaderService, private router: Router) {
        this.headerService.headerData = {
            title: "Cadastro de Produtos",
            icon: "storefront",
            routeUrl: "/products"
        };
    }

    ngOnInit(): void {
        this.loadProducts();
    }

    loadProducts(): void {
        this.productService.readProducts().subscribe(products => {
            this.products = products;
        });
    }

    //goToCreate(): void {
    //    this.router.navigate(["/products/create"]);
    //}

    openDialog(): void {
        const modal = this.dialog.open(ProductCreateModalComponent, {
            width: '400px',
            data: { name: '', price: null }
        });

        modal.afterClosed().subscribe(product => {
            if (product != undefined && product.name != '' && product.price != '') {
                this.productService.createProduct(product).subscribe(() => {
                    this.productService.showMessage('Produto criado com sucesso!');
                    this.loadProducts();
                });
            }
        });
    }
}