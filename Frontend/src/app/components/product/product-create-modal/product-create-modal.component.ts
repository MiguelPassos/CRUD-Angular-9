import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../product.model';


@Component({
    selector: 'app-product-create-modal',
    templateUrl: './product-create-modal.component.html',
    styleUrls: ['./product-create-modal.component.css']
})
export class ProductCreateModalComponent implements OnInit {

    product: Product = {
        name: '',
        price: null
    }

    constructor(public dialogRef: MatDialogRef<ProductCreateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Product) { }

    ngOnInit(): void {
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
