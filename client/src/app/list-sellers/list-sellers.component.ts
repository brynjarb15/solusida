import { Component, OnInit } from '@angular/core';
import { SellersService, SellerProduct, Seller } from '../sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerDlgComponent} from '../seller-dlg/seller-dlg.component';
import { Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';


@Component({
	selector: 'app-list-sellers',
	templateUrl: './list-sellers.component.html',
	styleUrls: ['./list-sellers.component.css']
})
export class ListSellersComponent implements OnInit {

	private sellers: Seller[];

	constructor(private modalService: NgbModal,
				private service: SellersService,
				private router: Router,
				private toastrService: ToastrService) { }

	ngOnInit() {
		this.service.getSellers().subscribe(result => {
			this.sellers = result;
		});
	}

	addSeller() {
		const modalInstance = this.modalService.open(SellerDlgComponent);
		modalInstance.componentInstance.seller = {
			name: '',
			category: '',
			imagePath: '',
			id: 0
		};
		modalInstance.result.then(obj => {
			console.log('Dialog was closed using Ok');
			this.service.addNewSeller(obj).subscribe(newSeller => {
				console.log('adding', newSeller);
				this.service.getSellers().subscribe(allSellers => {
					this.sellers = allSellers;
				});
				this.toastrService.success('Seljandinn ' + newSeller.name + ' var bætt við', 'Nýr seljandi');
			});
		}).catch(err => {
			// TODO: show some message about quiting
			console.log('Dialog was cancelled');
			console.log(err);
		});
	}

	goViewSeller(seller: Seller) {
		this.router.navigate(['sellers', seller.id]);
	}

}
