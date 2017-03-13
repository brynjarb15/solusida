/* tslint:disable:no-unused-variable */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellersService, Seller, SellerProduct } from '../sellers.service';
import { Observable } from 'rxjs/Observable';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';



import { SellerDetailsComponent } from './seller-details.component';

class SellersServiceMock {

	sellerProducts: SellerProduct[];
	seller: Seller;
	getSellerProduct(id: number): Observable<SellerProduct[]> {
		// þarf að breyta
		return Observable.of(this.sellerProducts);
	}
	getSellerById(id: number): Observable<Seller> {
		// þarf að breyta
		const ob = new Observable<Seller>(observable => {
			return observable.next(this.seller);
		});
		return ob;
	}

}

describe('SellerDetailsComponent', () => {
	let component: SellerDetailsComponent;
	let fixture: ComponentFixture<SellerDetailsComponent>;

	const mockService = new SellersServiceMock();

	const mockModal = {

	};

	const mockSnapshot = {
		params: 1
	}

	const mockRouter = {
		snapshot: mockSnapshot
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SellerDetailsComponent],
			providers: [{
				provide: SellersService,
				useValue: mockService
			}, {
				provide: NgbModal,
				useValue: mockModal
			}, {
				provide: ToastrService
			}, {
				provide: ActivatedRoute,
				useValue: mockRouter
			}],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SellerDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		// arrange
		mockService.sellerProducts = [{ id: 1, name: 'Skor', price: 999, quantitySold: 15, quantityInStock: 25, imagePath: 'pathAMynd' },
									  { id: 2, name: 'Buxur', price: 20000, quantitySold: 10, quantityInStock: 5, imagePath: 'pathAMynd' },
									  { id: 3, name: 'Peysa', price: 30000, quantitySold: 5, quantityInStock: 35, imagePath: 'pathAMynd' },
									  { id: 4, name: 'Hanskar', price: 40000, quantitySold: 25, quantityInStock: 5, imagePath: 'pathAMynd' },
									  { id: 5, name: 'Hufa', price: 50000, quantitySold: 35, quantityInStock: 45, imagePath: 'pathAMynd' },
									  { id: 6, name: 'Buxur', price: 60000, quantitySold: 45, quantityInStock: 55, imagePath: 'pathAMynd' },
									  { id: 7, name: 'Sokkar', price: 70000, quantitySold: 65, quantityInStock: 75, imagePath: 'pathAMynd' },
									  { id: 8, name: 'Taska', price: 80000, quantitySold: 99, quantityInStock: 85, imagePath: 'pathAMynd' },
									  { id: 9, name: 'Hulstur', price: 90000, quantitySold: 56, quantityInStock: 995, imagePath: 'pathAMynd' },
									  { id: 10, name: 'Flaska', price: 110000, quantitySold: 23, quantityInStock: 75, imagePath: 'pathAMynd' },
									  { id: 11, name: 'Teppi', price: 110000, quantitySold: 11, quantityInStock: 65, imagePath: 'pathAMynd' }]
		// act
		fixture.detectChanges();
		// assert
		expect(component).toBeTruthy();
	});
});
