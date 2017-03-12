import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export class Product {
	id: number;
	name: string;
	price: number;
  quantityInStock: number;
	quantitySold: number;
  imagePath: string;
}

@Component({
  selector: 'app-product-dlg',
  templateUrl: './product-dlg.component.html',
  styleUrls: ['./product-dlg.component.css']
})
export class ProductDlgComponent implements OnInit {

  private product: Product;
  noName;
  negPrice;
  negInStock;
  negSold;
  validInput;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  
  onCancel() {
    this.activeModal.dismiss();
  }

  onOk() {
    this.validInputForProduct();
    if(this.validInput) {
        this.activeModal.close(this.product);
    }
  }

  validInputForProduct() {
    this.noName = false;
    this.negPrice = false;
    this.negInStock = false;
    this.negSold = false;
    this.validInput = true;

    if (this.product.name === '') {
      this.noName = true;
      this.validInput = false;
    }
    if (this.product.price < 0 || !isFinite(this.product.price)) {
      this.negPrice = true;
      this.validInput = false;
    }
    if(this.product.quantityInStock < 0 || !isFinite(this.product.quantityInStock)) {
      this.negInStock = true;
      this.validInput = false;
    }
    if(this.product.quantitySold < 0 || !isFinite(this.product.quantitySold)) {
      this.negSold = true;
      this.validInput = false;
    }
  }
}
