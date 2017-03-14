import { Component, OnInit } from '@angular/core';
import { SellersService, SellerProduct, Seller } from '../sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDlgComponent } from '../product-dlg/product-dlg.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
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
		private route: ActivatedRoute,
		private router: Router) { }

	ngOnInit() {
		this.sellerId = this.route.snapshot.params['id'];

		this.service.getSellerProduct(this.sellerId).subscribe(productResult => {
			this.products = productResult;

			if (this.products.length === 0) {
				this.noProducts = true;
			} else {
				this.noProducts = false;
			}
		});

		this.service.getTop10ForSeller(this.sellerId).subscribe(top10Result => {
			this.topTenProducts = top10Result;
		});

		this.service.getSellerById(this.sellerId).subscribe(result => {
			this.seller = result;
		}, (err) => {
			this.toastrService.error('Seljandi finnst ekki', 'Villa');
			console.log('Something failed');
		});
	}

	isProductInTop10(obj) {
		for (let i = 0; i < this.products.length; i++) {
			if (obj.id === this.products[i].id) {
				return true;
			}
		}
		return false;
	}

	onProductEdited(p: SellerProduct) {
		this.service.editProduct(p, this.sellerId).subscribe(editResult => {
			this.toastrService.success('Vörunni ' + p.name + ' var breytt', 'Breytt vara');

			this.service.getTop10ForSeller(this.sellerId).subscribe(top10 => {
				this.topTenProducts = top10;
				if (this.isProductInTop10(p)) {
					this.toastrService.info('Varan ' + p.name + ' er á top 10 listanum', 'Top 10 vörur');
				}
			});
		});
	}

	addProduct() {
		const modalInstance = this.modalService.open(ProductDlgComponent);
		modalInstance.result.then(obj => {
			console.log('dialog was closed using ok');
			this.service.addProduct(obj, this.sellerId).subscribe(addResult => {
				console.log('addResult', addResult);
				this.service.getSellerProduct(this.sellerId).subscribe(allProducts => {
					console.log('getting Seller product');
					this.products = allProducts;
				});
				this.service.getTop10ForSeller(this.sellerId).subscribe(top10 => {
					this.topTenProducts = top10;
					if (this.isProductInTop10(obj)) {
						this.toastrService.info('Varan ' + obj.name + ' er á top 10 listanum', 'Top 10 vörur');
					}
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

	back() {
		this.router.navigate(['sellers']);
	}

}
