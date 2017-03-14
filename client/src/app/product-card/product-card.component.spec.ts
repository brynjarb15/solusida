/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerProduct } from '../sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrService } from 'ngx-toastr'



import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
	let component: ProductCardComponent;
	let fixture: ComponentFixture<ProductCardComponent>;

	const mockToastr = {
		warning: jasmine.createSpy('warning')
	}

	const testableSeller = {id: 0, name: 'Palli', category: 'Fot', imagePath: 'http://test.com/testImageFot.jpg'};
	const testableProduct = { id: 1, name: 'Skor', price: 999, quantitySold: 15, quantityInStock: 25, imagePath: 'pathAMynd' };
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
	}

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProductCardComponent],
			providers: [{
				provide: NgbModal,
				useValue: mockModal
			}, {
				provide: ToastrService,
				useValue: mockToastr
			}],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProductCardComponent);
		component = fixture.componentInstance;
		// fixture.detectChanges();
	});

	it('should create', () => {
		// arrange
		// act
		fixture.detectChanges();
		// assert

		expect(component).toBeTruthy();
	});

	describe('onEdit()', () => {

		it('should call emit if modal executed successfully', () => {
			// arrange
			mockModal.okPushed = true;
			component.product = testableProduct;
			let spy = spyOn(component.productUpdated, 'emit');
			// act
			component.onEdit();
			// assert

			expect(spy).toHaveBeenCalled();
		});

		it('should show warning toastr if modal canceled', () => {
			// arrange
			mockModal.okPushed = false;
			component.product = testableProduct;
			// act
			component.onEdit();
			// assert
			expect(mockToastr.warning).toHaveBeenCalled();
		});

	});
});
