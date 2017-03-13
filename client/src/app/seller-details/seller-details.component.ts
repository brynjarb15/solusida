import { Component, OnInit } from '@angular/core';
import { SellersService, SellerProduct, Seller } from '../sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDlgComponent } from '../product-dlg/product-dlg.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { SellerDlgComponent } from '../seller-dlg/seller-dlg.component';


@Component({
	selector: 'app-seller-details',
	templateUrl: './seller-details.component.html',
	styleUrls: ['./seller-details.component.css']
})
export class SellerDetailsComponent implements OnInit {

	products: SellerProduct[];
	topTenProducts: SellerProduct[];
	seller: Seller;
	sellerId: number;
	noProducts = true;

	constructor(private modalService: NgbModal,
		private service: SellersService,
		private toastrService: ToastrService,
		private route: ActivatedRoute) { }

	ngOnInit() {
		this.sellerId = this.route.snapshot.params['id'];

		this.service.getSellerProduct(this.sellerId).subscribe(productResult => {
			this.products = productResult;
			// afrita allt products yfir í toTenProducts
			this.topTenProducts = this.products.slice(0);
			// raða topTenProducts eftir quantitySold
			this.topTenProducts.sort((a, b) => {
				if (a.quantitySold < b.quantitySold) {
					return 1;
				}
				if (a.quantitySold > b.quantitySold) {
					return -1;
				}
				if (a.quantitySold === b.quantitySold) {
					return 0;
				}
			});
			// taka fyrstu 10 stökin af topTenProducts
			this.topTenProducts = this.topTenProducts.slice(0, 10);
			if (this.products.length === 0) {
				this.noProducts = true;
			} else {
				this.noProducts = false;
			}
		});

		this.service.getSellerById(this.sellerId).subscribe(result => {
			this.seller = result;
		}, (err) => {
			this.toastrService.error('Seljandi finnst ekki', 'Villa');
			console.log('Something failed');
		});
	}

	onProductEdited(p: SellerProduct) {
		this.service.editProduct(p, this.sellerId).subscribe(editResult => {
			this.toastrService.success('Vörunni ' + p.name + ' var breytt', 'Breytt vara');
		});
	}

	addProduct() {
		const modalInstance = this.modalService.open(ProductDlgComponent);
		modalInstance.result.then(obj => {
			console.log('dialog was closed using ok');
			this.service.addProduct(obj, this.sellerId).subscribe(addResult => {
				console.log('addResult', addResult);
				this.service.getSellerProduct(this.sellerId).subscribe(allProducts => {
					this.products = allProducts;
				});
				this.toastrService.success('Vörunni ' + obj.name + ' var bætt við', 'Ný vara');
			});
		}).catch(err => {
			this.toastrService.warning('Hætt var við að bæta við vöru', 'Ný vara');
			console.log('dialog was cancelled');
			console.log(err);
		});
	}

	editSeller() {
		const modalInstance = this.modalService.open(SellerDlgComponent);
		const backupSeller = {
			name: this.seller.name,
			id: this.seller.id,
			category: this.seller.category,
			imagePath: this.seller.imagePath
		};
		modalInstance.componentInstance.seller = this.seller;
		modalInstance.result.then(obj => {
			this.service.editSeller(obj).subscribe(editResult => {
				this.toastrService.success('Seljandanum ' + editResult.name + ' var breytt', 'Seljanda breytt');
			});
		}).catch(err => {
			this.seller = backupSeller;
			this.toastrService.warning('Hætt var við að breyta seljanda', 'Breyta seljanda');
			console.log('onEdit-productcardComp: ', err);
		});
	}

}
