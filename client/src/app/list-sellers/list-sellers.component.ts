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
	allIds = [];
	mostPopularItems = [];
	mostPopularSellerId = -1;
	quantity = -1;
	mostPopularProd: SellerProduct;
	mostPopularSeller: Seller;

	constructor(private modalService: NgbModal,
		private service: SellersService,
		private router: Router,
		private toastrService: ToastrService) { }

	ngOnInit() {
		this.service.getSellers().subscribe(result => {
			this.sellers = result;
			this.noSellers = this.sellers.length === 0;
		});

		this.service.getSellers().subscribe(allSellers => {
			for (let i = 0; i < allSellers.length; i++) {
				this.allIds.push(this.sellers[i].id);
			}
			for (let j = 0; j < this.allIds.length; j++) {
				this.service.getTop10ForSeller(this.allIds[j]).subscribe(top10 => {
					this.mostPopularItems.push(top10.slice(0, 1)[0])
					if (this.mostPopularItems[j] != undefined) {
						if (this.mostPopularItems[j].quantitySold > this.quantity) {
							this.quantity = this.mostPopularItems[j].quantitySold;
							this.mostPopularProd = this.mostPopularItems[j];
							//this.mostPopularSellerId = this.allIds[j];
							this.mostPopularSeller = allSellers[j];
						}
					}
				});
			}
		});
	}

	addSeller() {
		const modalInstance = this.modalService.open(SellerDlgComponent);
		modalInstance.result.then(obj => {
			this.service.addNewSeller(obj).subscribe(newSeller => {
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
