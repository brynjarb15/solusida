/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { SellerDlgComponent } from './seller-dlg.component';

xdescribe('SellerDlgComponent', () => {
	let component: SellerDlgComponent;
	let fixture: ComponentFixture<SellerDlgComponent>;

	const mockModal = {
		dismiss: jasmine.createSpy('dismiss'),
		close: jasmine.createSpy('close')
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SellerDlgComponent],
			providers: [{
				provide: NgbActiveModal,
				useValue: mockModal
			}],
			imports: [FormsModule],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

	it('should have seller with empty strings and -1 values', async(() => {
		// arrange
		const sellerDlg = fixture.debugElement.componentInstance;
		// act
		fixture.detectChanges();
		// assert
		expect(sellerDlg.seller.name).toEqual('');
		expect(sellerDlg.seller.id).toEqual(-1);
		expect(sellerDlg.seller.category).toEqual('');
		expect(sellerDlg.seller.imagePath).toEqual('');
	}));

	it('should call dissmiss on activeModal', async(() => {
		// arrange

		// act
		component.onCancel();
		fixture.detectChanges();
		// assert
		expect(mockModal.dismiss).toHaveBeenCalled();
	}));

	it('should call close on activeModal', async(() => {
		// arrange
		component.seller = {
			name: 'nameThatWorks',
			category: 'category',
			imagePath: 'myndPath',
			id: -1
		};
		// act
		component.onOk();
		fixture.detectChanges();
		// assert
		expect(mockModal.close).toHaveBeenCalled();
	}));

	it('should not call close on activeModal', async(() => {
		// arrange
		component.seller = {
			name: '',
			category: 'category',
			imagePath: 'myndPath',
			id: -1
		};
		mockModal.close = jasmine.createSpy('close');


		// act
		component.onOk();
		fixture.detectChanges();
		// assert
		expect(mockModal.close).not.toHaveBeenCalled();
	}));

	describe('validatedInput', () => {
		it('should return false', async(() => {
			// arrange
			// const sellerDlg = fixture.debugElement.componentInstance;
			component.seller = {
				name: '',
				category: '',
				imagePath: '',
				id: -1
			};

			// act // assert
			expect(component.validateInput()).toBeFalsy();
		}));
		it('should return false', async(() => {
			// arrange
			// const sellerDlg = fixture.debugElement.componentInstance;
			component.seller = {
				name: 'Pall Hermansson',
				category: 'Föt',
				imagePath: '',
				id: 0
			};

			// act // assert
			expect(component.validateInput()).toBeFalsy();
		}));
		it('should return false', async(() => {
			// arrange
			// const sellerDlg = fixture.debugElement.componentInstance;
			component.seller = {
				name: 'Pall Hermansson',
				category: 'Föt',
				imagePath: '',
				id: 0
			};

			// act // assert
			expect(component.validateInput()).toBeFalsy();
		}));
		it('should return false', async(() => {
			// arrange
			// const sellerDlg = fixture.debugElement.componentInstance;
			component.seller = {
				name: 'Pall Hermansson',
				category: '',
				imagePath: 'pathToPhoto',
				id: 0
			};

			// act // assert
			expect(component.validateInput()).toBeFalsy();
		}));
		it('should return true', async(() => {
			// arrange
			// const sellerDlg = fixture.debugElement.componentInstance;
			component.seller = {
				name: 'Pall Hermansson',
				category: 'Föt',
				imagePath: 'pathToPhoto',
				id: 0
			};

			// act // assert
			expect(component.validateInput()).toBeTruthy();
		}));
	});

});
