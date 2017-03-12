/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { SellersService } from './sellers.service';

describe('SellersService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [SellersService],
			imports: [HttpModule]
		});
	});

	it('should ...', inject([SellersService], (service: SellersService) => {
		expect(service).toBeTruthy();
	}));
});
