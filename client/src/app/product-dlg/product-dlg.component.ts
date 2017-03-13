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

  parentClass = 'has-danger';
	childClass = 'form-control-danger';

  isNameClass = '';
	isNameParentClass = '';
	isPriceClass = '';
	isPriceParentClass = '';
	isInStockClass = '';
	isInStockParentClass = '';
  isSoldClass = '';
  isSoldParentClass = '';

  noName = false;
  negPrice = false;
  negInStock = false;
  negSold = false;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  
  onCancel() {
    this.activeModal.dismiss();
  }

  onOk() {
    if(this.validInputForProduct()) {
        this.activeModal.close(this.product);
    }
  }

  validInputForProduct(): boolean {  

    if (this.product.name === '') {
      this.noName = true;
      this.isNameParentClass = this.parentClass;
			this.isNameClass = this.childClass;
    }
    else {
      this.noName = false;
      this.isNameParentClass = '';
			this.isNameClass = ''; 
    }
    if (this.product.price < 0 || !isFinite(this.product.price)) {
      this.negPrice = true;
      this.isPriceParentClass = this.parentClass;
      this.isPriceClass = this.childClass;
    }
    else {
      this.negPrice = false;
      this.isPriceParentClass = '';
      this.isPriceClass = '';
    }
    if(this.product.quantityInStock < 0 || !isFinite(this.product.quantityInStock)) {
      this.negInStock = true;
      this.isInStockParentClass = this.parentClass;
      this.isInStockClass = this.childClass;
    }
    else {
      this.negInStock = false;
      this.isInStockParentClass = '';
      this.isInStockClass = '';
    }
    if(this.product.quantitySold < 0 || !isFinite(this.product.quantitySold)) {
      this.negSold = true;
      this.isSoldParentClass = this.parentClass;
      this.isSoldClass = this.childClass;
    }
    else {
      this.negSold = false;
      this.isSoldParentClass = '';
      this.isSoldClass = '';
    }
    return !(this.noName || this.negPrice || this.negInStock || this.negSold);
  }
}
