/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ProductDlgComponent } from './product-dlg.component';

describe('ProductDlgComponent', () => {
	let component: ProductDlgComponent;
	let fixture: ComponentFixture<ProductDlgComponent>;

	const mockModal = {
		dismiss: jasmine.createSpy('dismiss'),
		close: jasmine.createSpy('close')
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProductDlgComponent],
			imports: [FormsModule],
			providers: [{
				provide: NgbActiveModal,
				useValue: mockModal
			}],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProductDlgComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have products with empty strings as values', async(() => {
		const productDlg = fixture.debugElement.componentInstance;
		fixture.detectChanges();
		expect(productDlg.product.id).toEqual(-1);
		expect(productDlg.product.name).toEqual('');
		expect(productDlg.product.price).toEqual(0);
		expect(productDlg.product.quantityInStock).toEqual(0);
		expect(productDlg.product.quantitySold).toEqual(0);
		expect(productDlg.product.imagePath).toEqual('');
	}));

	it('should call dismiss on activeModal', async(() => {
		component.onCancel();
		fixture.detectChanges();
		expect(mockModal.dismiss).toHaveBeenCalled();
	}));

	it('should call close on activeModal', async(() => {
		// arrange
		component.product = {
			id: -1,
			name: 'someName',
			price: 1000,
			quantityInStock: 500,
			quantitySold: 500,
			imagePath: 'someImagePath'
		};
		// act
		component.onOk();
		fixture.detectChanges();
		// assert
		expect(mockModal.close).toHaveBeenCalled();
	}));

	it('should not call close on activeModal', async(() => {
		// arrange
		component.product = {
			id: -1,
			name: 'someName',
			price: 1000,
			quantityInStock: 500,
			quantitySold: 500,
			imagePath: 'someImagePath'
		};
		mockModal.close = jasmine.createSpy('close');
		// act
		component.onOk();
		fixture.detectChanges();
		// assert
		expect(mockModal.close).not.toHaveBeenCalled();
	}));

	describe('validateInput', () => {
		it('should return false', async(() => {
			// arrange
			component.product = {
				id: -1,
				name: '',
				price: 0,
				quantityInStock: 0,
				quantitySold: 0,
				imagePath: ''
			};

			// act // assert
			expect(component.validInputForProduct()).toBeFalsy();
		}));

		it('should return false because of no name', async(() => {
			// arrange
			component.product = {
				id: 0,
				name: '',
				price: 100,
				quantityInStock: 10,
				quantitySold: 10,
				imagePath: 'someImagePath'
			};

			// act // assert
			expect(component.validInputForProduct()).toBeFalsy();
		}));
		it('should return false because of negative price', async(() => {
			// arrange
			component.product = {
				id: 0,
				name: 'someName',
				price: -100,
				quantityInStock: 10,
				quantitySold: 10,
				imagePath: 'someImagePath'
			};

			// act // assert
			expect(component.validInputForProduct()).toBeFalsy();
		}));
		it('should return false because of negative quantityInStock', async(() => {
			// arrange
			component.product = {
				id: 0,
				name: 'someName',
				price: 100,
				quantityInStock: -10,
				quantitySold: 10,
				imagePath: 'someImagePath'
			};

			// act // assert
			expect(component.validInputForProduct()).toBeFalsy();
		}));
		it('should return false because of negative quantitySold', async(() => {
			// arrange
			component.product = {
				id: 0,
				name: 'someName',
				price: 100,
				quantityInStock: 10,
				quantitySold: -10,
				imagePath: 'someImagePath'
			};

			// act // assert
			expect(component.validInputForProduct()).toBeFalsy();
		}));
		it('should return true', async(() => {
			// arrange
			component.product = {
				id: 0,
				name: 'someName',
				price: 100,
				quantityInStock: 10,
				quantitySold: 10,
				imagePath: 'someImagePath'
			};

			// act // assert
			expect(component.validInputForProduct()).toBeTruthy();
		}));
	});
});
