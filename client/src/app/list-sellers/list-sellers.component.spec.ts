/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Observable} from 'rxjs/Observable';
import { SellersService, Seller } from '../sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ListSellersComponent } from './list-sellers.component';

class SellersServiceMock {
	sellers = [];

	getSellers(): Observable<Seller[]> {
		const ob = new Observable<Seller[]>(observable => {
			return observable.next(this.sellers);
		});
		return ob;
	}
}

describe('ListSellersComponent', () => {
	const mockService = new SellersServiceMock();
	let component: ListSellersComponent;
	let fixture: ComponentFixture<ListSellersComponent>;
	let mockRouter = {
		navigate: jasmine.createSpy("navigate")
	};
	var mockModal = {
	}

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
				provide: ToastrService
			}],
			schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ListSellersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	xit('should have info in sellers', () => {
		const sellers = [ { name: 'Palli1', category: 'Fot', imagePath: 'http://test.com/testImageFot.jpg', id: 1 },
				{ name: 'Palli2', category: 'Stolar', imagePath: 'http://test.com/testImageStolar.jpg', id: 2 },
				{ name: 'Palli3', category: 'Bilar', imagePath: 'http://test.com/testImageBilar.jpg', id: 3 },
				{ name: 'Palli4', category: 'Battery', imagePath: 'http://test.com/testImageBattery.jpg', id: 4 }];
		this.mockService.sellers = sellers;

		const listSellers = fixture.debugElement.componentInstance;
		expect(listSellers.sellers).toEqual(sellers);
	});

});

