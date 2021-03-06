/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { SellersService, Seller, SellerProduct } from '../sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ListSellersComponent } from './list-sellers.component';

class SellersServiceMock {
	sellers: Seller[];
	seller: Seller;
	top10SellerProduct: SellerProduct[];

	getSellers(): Observable<Seller[]> {
		return Observable.of(this.sellers);
		/* const ob = new Observable<Seller[]>(observable => {
			return observable.next(this.sellers);
		});
		return ob;*/
	}

	addNewSeller(theSeller: Seller): Observable<Seller> {
		this.sellers.push(theSeller);
		return Observable.of(this.seller);
	}

	getTop10ForSeller(id: number): Observable<SellerProduct[]> {
		return Observable.of(this.top10SellerProduct);
	}
}

describe('ListSellersComponent', () => {
	const mockService = new SellersServiceMock();
	let component: ListSellersComponent;
	let fixture: ComponentFixture<ListSellersComponent>;

	const testSellers = [{ name: 'Palli1', category: 'Fot', imagePath: 'http://test.com/testImageFot.jpg', id: 1 },
	{ name: 'Palli2', category: 'Stolar', imagePath: 'http://test.com/testImageStolar.jpg', id: 2 },
	{ name: 'Palli3', category: 'Bilar', imagePath: 'http://test.com/testImageBilar.jpg', id: 3 },
	{ name: 'Palli4', category: 'Battery', imagePath: 'http://test.com/testImageBattery.jpg', id: 4 }];

	const top10OfTestableProductData = [{ id: 8, name: 'Taska', price: 80000, quantitySold: 99, quantityInStock: 85, imagePath: 'pathAMynd' },
		{ id: 7, name: 'Sokkar', price: 70000, quantitySold: 65, quantityInStock: 75, imagePath: 'pathAMynd' },
		{ id: 9, name: 'Hulstur', price: 90000, quantitySold: 56, quantityInStock: 995, imagePath: 'pathAMynd' },
		{ id: 6, name: 'Buxur', price: 60000, quantitySold: 45, quantityInStock: 55, imagePath: 'pathAMynd' },
		{ id: 5, name: 'Hufa', price: 50000, quantitySold: 35, quantityInStock: 45, imagePath: 'pathAMynd' },
		{ id: 4, name: 'Hanskar', price: 40000, quantitySold: 25, quantityInStock: 5, imagePath: 'pathAMynd' },
		{ id: 10, name: 'Flaska', price: 110000, quantitySold: 23, quantityInStock: 75, imagePath: 'pathAMynd' },
		{ id: 1, name: 'Skor', price: 999, quantitySold: 15, quantityInStock: 25, imagePath: 'pathAMynd' },
		{ id: 11, name: 'Teppi', price: 110000, quantitySold: 11, quantityInStock: 65, imagePath: 'pathAMynd' },
		{ id: 2, name: 'Buxur', price: 20000, quantitySold: 10, quantityInStock: 5, imagePath: 'pathAMynd' }];

	const testableSeller = { id: 0, name: 'Palli', category: 'Fot', imagePath: 'http://test.com/testImageFot.jpg' };

	const mockRouter = {
		navigate: jasmine.createSpy('navigate')
	};

	const mockToastr = {
		success: jasmine.createSpy('success'),
		warning: jasmine.createSpy('warning'),
		error: jasmine.createSpy('error')
	};

	const mockModal = {
		okPushed: true,
		open: function () {
			return {
				result: {
					then: function (okClosed, cancelClosed) {
						if (mockModal.okPushed === true) {
							okClosed(testableSeller);
							return {
								catch: function () {
								}
							};
						} else {
							return {
								catch: function (cancelClosed) {
									cancelClosed();
								}
							};
						}
					}

				},
				componentInstance: {
					seller: testableSeller
				}
			};
		}
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ListSellersComponent],
			providers: [{
				provide: SellersService,
				useValue: mockService
			}, {
				provide: NgbModal,
				useValue: mockModal
			}, {
				provide: Router,
				useValue: mockRouter
			}, {
				provide: ToastrService,
				useValue: mockToastr
			}],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ListSellersComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		// arrange
		// act
		// assert
		expect(component).toBeTruthy();
	});

	it('should have info in sellers', () => {
		// arrange
		const listSellers = fixture.debugElement.componentInstance;

		const sellers = [{ name: 'Palli1', category: 'Fot', imagePath: 'http://test.com/testImageFot.jpg', id: 1 },
		{ name: 'Palli2', category: 'Stolar', imagePath: 'http://test.com/testImageStolar.jpg', id: 2 },
		{ name: 'Palli3', category: 'Bilar', imagePath: 'http://test.com/testImageBilar.jpg', id: 3 },
		{ name: 'Palli4', category: 'Battery', imagePath: 'http://test.com/testImageBattery.jpg', id: 4 }];
		mockService.sellers = sellers;
		mockService.top10SellerProduct = top10OfTestableProductData;
		// act
		// make ngOnInit run
		fixture.detectChanges();
		// assert
		expect(listSellers.sellers).toEqual(sellers);
	});

	it('should rederect to details about seller', () => {
		// arrange
		const sellerToView = { name: 'Solumadur', id: 5, category: 'Stolar', imagePath: 'http://test.com/testImageStolar.jpg' };
		// act
		component.goViewSeller(sellerToView);
		fixture.detectChanges();
		// assert
		expect(mockRouter.navigate).toHaveBeenCalledWith(['sellers', sellerToView.id]);
	});

	it('should have things in sellers', () => {
		// arrange
		mockService.seller = { id: 1, name: 'Palli', category: 'fot', imagePath: 'pathAMynd' };
		// act
		fixture.detectChanges();
		// assert
		expect(component.sellers).toBeTruthy();
	});

	describe('addSeller()', () => {
		it('should fill sellers with all sellers', () => {
			// arrange
			mockService.sellers = testSellers;
			// act
			component.addSeller();
			// assert
			expect(component.sellers).toBe(testSellers);
		});

		it('shoud show success toastr', () => {
			// arrange
			// act
			component.addSeller();
			// assert
			expect(mockToastr.success).toHaveBeenCalled();
		});

		it('should show warning toastr when action is canceled', () => {
			// arrange
			mockModal.okPushed = false;
			// act
			component.addSeller();
			// assert
			expect(mockToastr.warning).toHaveBeenCalled();
		});
	});
});

