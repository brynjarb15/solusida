/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerProduct } from '../sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrService}  from 'ngx-toastr'



import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
	let component: ProductCardComponent;
	let fixture: ComponentFixture<ProductCardComponent>;

	const mockModal = {

	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProductCardComponent],
			providers: [{
				provide: NgbModal,
				useValue: mockModal
			}, {
				provide: ToastrService
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
});
