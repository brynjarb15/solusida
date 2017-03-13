/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, } from '@angular/core/testing';
import { SellersService } from './sellers.service';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('SellersService', () => {

	let mockHttp = {
		get: jasmine.createSpy('get')
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [SellersService, {
				provide: Http,
				useValue: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
					return new Http(backendInstance, defaultOptions);
				},],
			imports: []
		});
	});

	it('should ...', inject([SellersService], (service: SellersService) => {

		expect(service).toBeTruthy();
	}));

	it('should make a http get call when getSellerProduct', inject([SellersService], (service: SellersService) => {
		const spy = spyOn(Http, 'get').and.callThrough();
		service.getSellerProduct(3);
		expect(spy).toHaveBeenCalled();
	});
});

