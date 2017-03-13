import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SellerProduct } from '../sellers.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ProductDlgComponent } from '../product-dlg/product-dlg.component';

@Component({
	selector: 'app-product-card',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

	@Input()
	product: SellerProduct;

	@Output()
	productUpdated = new EventEmitter();

	constructor(private modalService: NgbModal) { }

	ngOnInit() {
	}

	onEdit() {
		const modalInstance = this.modalService.open(ProductDlgComponent)
		const backupProduct = {
			id: this.product.id,
			name: this.product.name,
			price: this.product.price,
			quantityInStock: this.product.quantityInStock,
			quantitySold: this.product.quantitySold,
			imagePath: this.product.imagePath
		};

		modalInstance.componentInstance.product = this.product;
		modalInstance.result.then(obj => {
			this.productUpdated.emit(obj);
		}).catch(err => {
			this.product = backupProduct;
			// TODO: display cancel message
			console.log("onEdit-productcardComp: ", err);
		});
	}
}
