import { Component, OnInit } from '@angular/core';
import { SellersService, Seller} from './sellers.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'app works!';

	private sellers: Seller[];
	private seller: Seller;

	constructor(private service: SellersService) {}

	ngOnInit() {

		var errorHandler = 
		this.service.getSellerById(1).subscribe(result => {
			this.seller = result;
		}, (err) => {
			// TODO: display toastr!
			console.log('Something failed');
		});
		
		this.service.getSellers().subscribe(result => {
			this.sellers = result;
		});
/*
		this.service.getSellerDetails(1).subscribe(result => {

		});
*/
	}
}
