/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { SellersService, Seller } from '../sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ListSellersComponent } from './list-sellers.component';

class SellersServiceMock {
	sellers: Seller[];
	seller: Seller;

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
}

describe('ListSellersComponent', () => {
	const mockService = new SellersServiceMock();
	let component: ListSellersComponent;
	let fixture: ComponentFixture<ListSellersComponent>;

	const testSellers = [{ name: 'Palli1', category: 'Fot', imagePath: 'http://test.com/testImageFot.jpg', id: 1 },
	{ name: 'Palli2', category: 'Stolar', imagePath: 'http://test.com/testImageStolar.jpg', id: 2 },
	{ name: 'Palli3', category: 'Bilar', imagePath: 'http://test.com/testImageBilar.jpg', id: 3 },
	{ name: 'Palli4', category: 'Battery', imagePath: 'http://test.com/testImageBattery.jpg', id: 4 }];

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

