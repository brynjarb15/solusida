import { Component, OnInit } from '@angular/core';
import { SellersService, SellerProduct, Seller } from '../sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerDlgComponent} from '../seller-dlg/seller-dlg.component';


@Component({
	selector: 'app-list-sellers',
	templateUrl: './list-sellers.component.html',
	styleUrls: ['./list-sellers.component.css']
})
export class ListSellersComponent implements OnInit {

	private sellers: Seller[];

	constructor(private modalService: NgbModal,
				private service: SellersService) { }

	ngOnInit() {
		this.service.getSellers().subscribe(result => {
			this.sellers = result;
		});
	}

	addSeller() {
		const modalInstance = this.modalService.open(SellerDlgComponent)
		modalInstance.componentInstance.seller = {
			name: '',
			category: '',
			imagePath: '',
			id: 0
		};
		modalInstance.result.then(obj => {
			console.log("Dialog was closed using OL");
			console.log(obj);
			this.service.addNewSeller(obj).subscribe(result => {
				console.log(result);
				
			});
		}).catch(err => {
			console.log("Dialog was cancelled");
			console.log(err);
		});
	}

}
