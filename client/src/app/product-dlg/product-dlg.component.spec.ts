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
		const productDlg = fixture.debugElement.componentInstance; // þarf að breyta
		productDlg.product = { // þarf að breyta
			id: 0,
			name: '',
			price: 0,
			quantityInStock: 0,
			quantitySold: '',
			imagePath: ''
		}
		component = fixture.componentInstance;
		fixture.detectChanges();


	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
