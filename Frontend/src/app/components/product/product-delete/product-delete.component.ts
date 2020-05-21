import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';

@Component({
    selector: 'app-product-delete',
    templateUrl: './product-delete.component.html',
    styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

    product: Product = {
        name: '',
        price: null
    };

    constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.productService.readProductById(id).subscribe(product => {
            this.product = product;
        })
    }

    deleteProduct(): void {
        this.productService.deleteProduct(this.product).subscribe(() => {
                this.productService.showMessage('Produto removido com sucesso!');
                this.router.navigate(['/products']);
            });
    }

    cancel(): void {
        this.router.navigate(['/products']);
    }

}
