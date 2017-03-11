import { Component, OnInit } from '@angular/core';
import { SellersService, SellerProduct, Seller } from '../sellers.service'
@Component({
	selector: 'app-seller-details',
	templateUrl: './seller-details.component.html',
	styleUrls: ['./seller-details.component.css']
})
export class SellerDetailsComponent implements OnInit {

	products: SellerProduct[];
	private seller: Seller;

	constructor(private service: SellersService) { }

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
		console.log(p);
	}

}
