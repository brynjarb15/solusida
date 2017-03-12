/* tslint:disable:no-unused-variable */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellersService, Seller, SellerProduct } from '../sellers.service';
import { Observable} from 'rxjs/Observable';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



import { SellerDetailsComponent } from './seller-details.component';

class SellersServiceMock {

	sellerProduct: any;
	getSellerProduct(id: number): Observable<SellerProduct[]> {
		//þarf að breyta
		const ob = new Observable<SellerProduct[]>(observable => {
			return observable.next(this.sellerProduct);
		});
		return ob;
	}
	getSellerById(id: number): Observable<Seller> {
		//þarf að breyta
		const ob = new Observable<Seller>(observable => {
			return observable.next(this.sellerProduct);
		});
		return ob;
	}

}

describe('SellerDetailsComponent', () => {
	let component: SellerDetailsComponent;
	let fixture: ComponentFixture<SellerDetailsComponent>;

	let mockService = new SellersServiceMock();
	
	let mockModal = {

	}

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SellerDetailsComponent],
			providers: [{
				provide: SellersService,
				useValue: mockService
			},{
				provide: NgbModal,
				useValue: mockModal
			}],
			schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SellerDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
