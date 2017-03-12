/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { SellerDlgComponent } from './seller-dlg.component';

describe('SellerDlgComponent', () => {
	let component: SellerDlgComponent;
	let fixture: ComponentFixture<SellerDlgComponent>;

	var mockModal = {

	}

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SellerDlgComponent],
			providers: [ {
				provide: NgbActiveModal,
				useValue: mockModal
			}],
			imports: [FormsModule],
			schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SellerDlgComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
