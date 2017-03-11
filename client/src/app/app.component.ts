import { Component, OnInit } from '@angular/core';
import { SellersService, Seller, SellerProduct } from './sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { SellerDlgComponent } from './seller-dlg/seller-dlg.component';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'app works!';

	private sellers: Seller[];
	private seller: Seller;
	products: SellerProduct[];

	constructor(private service: SellersService,
		private modalService: NgbModal) { }

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

		this.service.getSellers().subscribe(result => {
			this.sellers = result;
		});
		/*
				this.service.getSellerDetails(1).subscribe(result => {
		
				});
		*/
	}

	onProductEdited(p: SellerProduct) {
		console.log(p);
	}

	addSeller() {
		const modalInstance = this.modalService.open(SellerDlgComponent)
		modalInstance.componentInstance.seller = {
			name: 'Brynjar',
			category: 'cat',
			imagePath: 'pathToImage',
			id: 5
		};
		modalInstance.result.then(obj => {
			console.log("Dialog was closed using OL");
			console.log(obj);
		}).catch(err => {
			console.log("Dialog was cancelled");
			console.log(err);
		});
	}

	
}
