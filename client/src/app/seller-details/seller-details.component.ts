import { Component, OnInit } from '@angular/core';
import { SellersService, SellerProduct, Seller } from '../sellers.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDlgComponent } from '../product-dlg/product-dlg.component';

@Component({
	selector: 'app-seller-details',
	templateUrl: './seller-details.component.html',
	styleUrls: ['./seller-details.component.css']
})
export class SellerDetailsComponent implements OnInit {

	products: SellerProduct[];
	private seller: Seller;

	constructor(private modalService: NgbModal,
				private service: SellersService) { }

	ngOnInit() {

		this.service.getSellerProduct(1).subscribe(result => {
			this.products = result;
		});

		this.service.getSellerById(1).subscribe(result => {
			this.seller = result;
		}, (err) => {
			// TODO: display toastr!
			console.log('Something failed');
		});

	}

	onProductEdited(p: SellerProduct) {
		this.service.editProduct(p, this.seller.id).subscribe(result => {
		});
	}

	addProduct() {
		const modalInstance = this.modalService.open(ProductDlgComponent)
		modalInstance.componentInstance.product = {
			name: '',
			price: '',
  			quantityInStock: '',
			quantitySold: '',
			imagePath: ''
		};		
		modalInstance.result.then(obj => {
		this.service.addProduct(obj, this.seller.id).subscribe(result => {
			console.log(obj, " has been added");
		});
			console.log("dialog was closed using ok");
			console.log(obj);
		}).catch(err => {
			console.log("dialog was cancelled");
			console.log(err);
		});
	}

}
