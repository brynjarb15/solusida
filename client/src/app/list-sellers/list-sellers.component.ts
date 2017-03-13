import { Component, OnInit } from '@angular/core';
import { SellersService, SellerProduct, Seller } from '../sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerDlgComponent } from '../seller-dlg/seller-dlg.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
	selector: 'app-list-sellers',
	templateUrl: './list-sellers.component.html',
	styleUrls: ['./list-sellers.component.css']
})
export class ListSellersComponent implements OnInit {

	sellers = [];
	noSellers = true;

	constructor(private modalService: NgbModal,
		private service: SellersService,
		private router: Router,
		private toastrService: ToastrService) { }

	ngOnInit() {
		this.service.getSellers().subscribe(result => {
			this.sellers = result;
			this.noSellers = this.sellers.length === 0;
		});
	}

	addSeller() {
		const modalInstance = this.modalService.open(SellerDlgComponent);
		modalInstance.result.then(obj => {
			console.log('Dialog was closed using Ok');
			this.service.addNewSeller(obj).subscribe(newSeller => {
				console.log('adding', newSeller);
				this.service.getSellers().subscribe(allSellers => {
					this.sellers = allSellers;
					this.noSellers = this.sellers.length === 0;
				});
				this.toastrService.success('Seljandinn ' + newSeller.name + ' var bætt við', 'Nýr seljandi');
			});
		}).catch(err => {
			this.toastrService.warning('Hætt var við að bæta við seljanda', 'Bæta við seljanda');
		});
	}

	goViewSeller(seller: Seller) {
		this.router.navigate(['sellers', seller.id]);
	}

}
