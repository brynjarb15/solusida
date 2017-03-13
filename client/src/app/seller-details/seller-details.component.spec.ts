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
	sellerProduct: SellerProduct;
	seller: Seller;
	sellerById = true;
	getSellerProduct(id: number): Observable<SellerProduct[]> {
		// þarf að breyta
		return Observable.of(this.sellerProducts);
	}
	getSellerById(id: number): Observable<Seller> {
		// þarf að breyta
		const ob = new Observable<Seller>(observable => {
			if (this.sellerById) {
				return observable.next(this.seller);
			} else {
				throw Observable.throw(this.seller);
			}
		});
		return ob;
	}
	editProduct(theProduct: SellerProduct, sellerId: number): Observable<SellerProduct> {
		return Observable.of(this.sellerProduct);
	}

	addProduct(theProduct: SellerProduct, sellerId: number): Observable<SellerProduct> {
		this.sellerProducts.push(theProduct);
		return Observable.of(this.sellerProduct);
	}

}

describe('SellerDetailsComponent', () => {
	let component: SellerDetailsComponent;
	let fixture: ComponentFixture<SellerDetailsComponent>;
	let modalService: NgbModal;

	const testableProductData = [{ id: 1, name: 'Skor', price: 999, quantitySold: 5, quantityInStock: 25, imagePath: 'pathAMynd' },
	{ id: 2, name: 'Buxur', price: 20000, quantitySold: 10, quantityInStock: 5, imagePath: 'pathAMynd' },
	{ id: 3, name: 'Peysa', price: 30000, quantitySold: 5, quantityInStock: 5, imagePath: 'pathAMynd' },
	{ id: 4, name: 'Hanskar', price: 40000, quantitySold: 25, quantityInStock: 5, imagePath: 'pathAMynd' },
	{ id: 5, name: 'Hufa', price: 50000, quantitySold: 35, quantityInStock: 45, imagePath: 'pathAMynd' },
	{ id: 6, name: 'Buxur', price: 60000, quantitySold: 45, quantityInStock: 55, imagePath: 'pathAMynd' },
	{ id: 7, name: 'Sokkar', price: 70000, quantitySold: 65, quantityInStock: 75, imagePath: 'pathAMynd' },
	{ id: 8, name: 'Taska', price: 80000, quantitySold: 99, quantityInStock: 85, imagePath: 'pathAMynd' },
	{ id: 9, name: 'Hulstur', price: 90000, quantitySold: 56, quantityInStock: 995, imagePath: 'pathAMynd' },
	{ id: 10, name: 'Flaska', price: 110000, quantitySold: 23, quantityInStock: 75, imagePath: 'pathAMynd' },
	{ id: 11, name: 'Teppi', price: 110000, quantitySold: 11, quantityInStock: 65, imagePath: 'pathAMynd' }];

	const testableSeller = { id: 1, name: 'Palli', category: 'fot', imagePath: 'pathAMynd' };

	const mockService = new SellersServiceMock();

	const mockModal2 = {
		open: jasmine.createSpy('open')
	};

	const mockToastr = {
		success: jasmine.createSpy('success'),
		warning: jasmine.createSpy('warning')
	}


	const mockModal = {
		okPhused: true,
		open: function () {
			return {
				result: {
					then: function (okClosed, cancelClosed) {
						if (mockModal.okPhused === true) {
							okClosed(testableSeller);
							return {
								catch: function () {
								}
							}
						} else {
							return {
								catch: function (cancelClosed) {
									cancelClosed();
								}
							}
						}
					}

				},
				componentInstance: {
					seller: testableSeller
				}
			};
		}
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
				provide: ToastrService,
				useValue: mockToastr
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
	});

	it('should create', () => {
		// arrange
		/*mockService.sellerProducts = [{ id: 1, name: 'Skor', price: 999, quantitySold: 15, quantityInStock: 25, imagePath: 'pathAMynd' },
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
		*/// act
		// assert
		expect(component).toBeTruthy();
	});

	it('should have stuff in products', () => {
		// arrange
		mockService.sellerProducts = testableProductData;
		// act
		fixture.detectChanges();
		//assert
		expect(component.products).toBeTruthy();
	});

	it('should have topTenProducts not equal to products', () => {
		// arrange
		mockService.sellerProducts = testableProductData;
		// act
		fixture.detectChanges();
		//assert
		expect(component.topTenProducts).not.toBe(component.products);
	});

	it('should have stuff in seller', () => {
		// arrange
		mockService.seller = { id: 1, name: 'Palli', category: 'fot', imagePath: 'pathAMynd' };
		// act
		fixture.detectChanges();
		//assert
		expect(component.seller).toBeTruthy();
	});

	describe('onProductEdited()', () => {
		it('should display toastr', () => {
			// arrange
			const productToEdit = { id: 1, name: 'Palli', price: 999, quantityInStock: 15, quantitySold: 8, imagePath: 'pathAMynd' };
			mockService.sellerProduct = productToEdit;
			// act
			component.onProductEdited(productToEdit);

			//assert
			// gera spy a toastr og athuga hvort kallad var i hann
			expect(mockToastr.success).toHaveBeenCalled();
		});
	});

	describe('addProduct()', () => {
		it('should fill products with all products', () => {
			// arrange
			mockService.sellerProducts = testableProductData;
			// act
			component.addProduct();
			// assert
			expect(component.products).toBe(testableProductData);
		});

		it('shoud show success toastr', () => {
			// arrange
			// act
			component.addProduct();
			// assert
			expect(mockToastr.success).toHaveBeenCalled();
		});

		it('should show warning toastr when action is canceled', () => {
			// arrange
			mockModal.okPhused = false;
			// act
			component.addProduct();
			// assert
			expect(mockToastr.warning).toHaveBeenCalled();
		});
	});
	describe('editSeller()', () => {
		it('should call open on modalService', () => {
			// arrange
			let spy = spyOn(mockModal, 'open');
			component.seller = testableSeller;
			// act
			component.editSeller();
			// assert
			expect(spy).not.toHaveBeenCalled();
		});
	});
});
