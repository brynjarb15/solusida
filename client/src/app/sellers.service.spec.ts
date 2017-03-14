/* tslint:disable:no-unused-variable */
// we got some help doing the from over here https://github.com/blacksonic/ngx-http-test

import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';

import { HttpModule, Http, Response, ResponseOptions, XHRBackend, BaseRequestOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { SellersService } from './sellers.service';

describe('SellersService', () => {

	const testableProductData = [{ id: 1, name: 'Skor', price: 999, quantitySold: 15, quantityInStock: 25, imagePath: 'pathAMynd' },
	{ id: 2, name: 'Buxur', price: 20000, quantitySold: 5, quantityInStock: 5, imagePath: 'pathAMynd' },
	{ id: 3, name: 'Peysa', price: 30000, quantitySold: 5, quantityInStock: 5, imagePath: 'pathAMynd' },
	{ id: 4, name: 'Hanskar', price: 40000, quantitySold: 25, quantityInStock: 5, imagePath: 'pathAMynd' },
	{ id: 5, name: 'Hufa', price: 50000, quantitySold: 35, quantityInStock: 45, imagePath: 'pathAMynd' },
	{ id: 6, name: 'Buxur', price: 60000, quantitySold: 45, quantityInStock: 55, imagePath: 'pathAMynd' },
	{ id: 7, name: 'Sokkar', price: 70000, quantitySold: 65, quantityInStock: 75, imagePath: 'pathAMynd' },
	{ id: 8, name: 'Taska', price: 80000, quantitySold: 99, quantityInStock: 85, imagePath: 'pathAMynd' },
	{ id: 9, name: 'Hulstur', price: 90000, quantitySold: 56, quantityInStock: 995, imagePath: 'pathAMynd' },
	{ id: 10, name: 'Flaska', price: 110000, quantitySold: 23, quantityInStock: 75, imagePath: 'pathAMynd' },
	{ id: 11, name: 'Teppi', price: 110000, quantitySold: 11, quantityInStock: 65, imagePath: 'pathAMynd' }];

	const product = { id: 1, name: 'Skor', price: 999, quantitySold: 15, quantityInStock: 25, imagePath: 'pathAMynd' };

	const testSellers = [{ name: 'Palli1', category: 'Fot', imagePath: 'http://test.com/testImageFot.jpg', id: 1 },
	{ name: 'Palli2', category: 'Stolar', imagePath: 'http://test.com/testImageStolar.jpg', id: 2 },
	{ name: 'Palli3', category: 'Bilar', imagePath: 'http://test.com/testImageBilar.jpg', id: 3 },
	{ name: 'Palli4', category: 'Battery', imagePath: 'http://test.com/testImageBattery.jpg', id: 4 }];

	const testableSeller = { id: 1, name: 'Palli', category: 'fot', imagePath: 'pathAMynd' };



	let subject: SellersService;
	let backend: MockBackend;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				SellersService,
				MockBackend,
				BaseRequestOptions,
				{
					provide: Http,
					useFactory: (mockBackend, defaultOptions) => {
						return new Http(mockBackend, defaultOptions);
					},
					deps: [MockBackend, BaseRequestOptions]
				}, 
			],
		});
	});

	beforeEach(inject([SellersService, MockBackend], (sellersService, mockBackend) => {
		subject = sellersService;
		backend = mockBackend;
	}));
	describe('getSellerProduct()', () => {
		it('should get products', (done) => {
			backend.connections.subscribe((connection: MockConnection) => {
				const options = new ResponseOptions({ body: testableProductData });

				connection.mockRespond(new Response(options));
			});
			subject.getSellerProduct(1).subscribe((response) => {
				expect(response).toEqual(testableProductData);
				done();
			});
		});

		it('should be called with proper arguments', (done) => {
			backend.connections.subscribe((connection: MockConnection) => {
				expect(connection.request.url).toEqual('http://localhost:5000/api/sellers/1/products');
				expect(connection.request.method).toEqual(RequestMethod.Get);

				const options = new ResponseOptions({ body: testableProductData });

				connection.mockRespond(new Response(options));
			});

			subject.getSellerProduct(1).subscribe(() => { done(); });
		});
	});

	describe('getTop10ForSeller()', () => {
		it('should get Top 10 Products which are equal to all products', (done) => {
			backend.connections.subscribe((connection: MockConnection) => {
				const options = new ResponseOptions({ body: testableProductData });

				connection.mockRespond(new Response(options));
			});
			subject.getTop10ForSeller(1).subscribe((response) => {
				expect(response.length).toBe(10);
				expect(response).not.toEqual(testableProductData);
				done();
			});
		});

		it('should be called with proper arguments', (done) => {
			backend.connections.subscribe((connection: MockConnection) => {
				expect(connection.request.url).toEqual('http://localhost:5000/api/sellers/1/products');
				expect(connection.request.method).toEqual(RequestMethod.Get);

				const options = new ResponseOptions({ body: testableProductData });

				connection.mockRespond(new Response(options));
			});

			subject.getTop10ForSeller(1).subscribe(() => { done(); });
		});
	});

	describe('addProduct()', () => {
		it('should return with same values as are sent in', (done) => {
			backend.connections.subscribe((connection: MockConnection) => {
				const options = new ResponseOptions({ body: product });

				connection.mockRespond(new Response(options));
			});
			subject.addProduct(product, 1).subscribe((response) => {
				expect(response.name).toBe(product.name);
				expect(response.imagePath).toBe(product.imagePath);
				expect(response.price).toBe(product.price);
				expect(response.quantityInStock).toBe(product.quantityInStock);
				done();
			});
		});

		it('should be called with proper arguments', (done) => {
			backend.connections.subscribe((connection: MockConnection) => {
				expect(connection.request.url).toEqual('http://localhost:5000/api/sellers/1/products');
				expect(connection.request.method).toEqual(RequestMethod.Post);

				const options = new ResponseOptions({ body: product });

				connection.mockRespond(new Response(options));
			});

			subject.addProduct(product, 1).subscribe(() => { done(); });
		});
	});

	describe('editProduct()', () => {
		it('should return with same values as are sent in', (done) => {
			backend.connections.subscribe((connection: MockConnection) => {
				const options = new ResponseOptions({ body: product });

				connection.mockRespond(new Response(options));
			});
			subject.editProduct(product, 1).subscribe((response) => {
				expect(response.name).toBe(product.name);
				expect(response.imagePath).toBe(product.imagePath);
				expect(response.price).toBe(product.price);
				expect(response.quantityInStock).toBe(product.quantityInStock);
				done();
			});
		});

		it('should be called with proper arguments', (done) => {
			backend.connections.subscribe((connection: MockConnection) => {
				expect(connection.request.url).toEqual('http://localhost:5000/api/sellers/1/products/' + product.id);
				expect(connection.request.method).toEqual(RequestMethod.Put);

				const options = new ResponseOptions({ body: product });

				connection.mockRespond(new Response(options));
			});

			subject.editProduct(product, 1).subscribe(() => { done(); });
		});

	});

	describe('getSellers()', () => {
		it('should get sellers', (done) => {
			backend.connections.subscribe((connection: MockConnection) => {
				const options = new ResponseOptions({ body: testSellers });

				connection.mockRespond(new Response(options));
			});
			subject.getSellers().subscribe((response) => {
				expect(response).toEqual(testSellers);
				done();
			});
		});

		it('should be called with proper arguments', (done) => {
			backend.connections.subscribe((connection: MockConnection) => {
				expect(connection.request.url).toEqual('http://localhost:5000/api/sellers');
				expect(connection.request.method).toEqual(RequestMethod.Get);

				const options = new ResponseOptions({ body: testableProductData });

				connection.mockRespond(new Response(options));
			});

			subject.getSellers().subscribe(() => { done(); });
		});
	});

	describe('getSellerById()', () => {
		it('should get 1 seller by id', (done) => {
			backend.connections.subscribe((connection: MockConnection) => {
				const options = new ResponseOptions({ body: testableSeller });

				connection.mockRespond(new Response(options));
			});
			subject.getSellerById(1).subscribe((response) => {
				expect(response.id).toEqual(1);
				expect(response).toEqual(testableSeller);
				done();
			});
		});

		it('should be called with proper arguments', (done) => {
			backend.connections.subscribe((connection: MockConnection) => {
				expect(connection.request.url).toEqual('http://localhost:5000/api/sellers/1');
				expect(connection.request.method).toEqual(RequestMethod.Get);

				const options = new ResponseOptions({ body: testableProductData });

				connection.mockRespond(new Response(options));
			});

			subject.getSellerById(1).subscribe(() => { done(); });
		});
	});

	describe('editSeller()', () => {
		it('should get seller that was sent in', (done) => {
			backend.connections.subscribe((connection: MockConnection) => {
				const options = new ResponseOptions({ body: testableSeller });

				connection.mockRespond(new Response(options));
			});
			subject.editSeller(testableSeller).subscribe((response) => {
				expect(response).toEqual(testableSeller);
				done();
			});
		});

		it('should be called with proper arguments', (done) => {
			backend.connections.subscribe((connection: MockConnection) => {
				expect(connection.request.url).toEqual('http://localhost:5000/api/sellers/' + testableSeller.id);
				expect(connection.request.method).toEqual(RequestMethod.Put);

				const options = new ResponseOptions({ body: testableProductData });

				connection.mockRespond(new Response(options));
			});

			subject.editSeller(testableSeller).subscribe(() => { done(); });
		});
	});

	describe('addNewSeller()', () => {
		it('should get seller that was sent in', (done) => {
			backend.connections.subscribe((connection: MockConnection) => {
				const options = new ResponseOptions({ body: testableSeller });

				connection.mockRespond(new Response(options));
			});
			subject.addNewSeller(testableSeller).subscribe((response) => {
				expect(response).toEqual(testableSeller);
				done();
			});
		});

		it('should be called with proper arguments', (done) => {
			backend.connections.subscribe((connection: MockConnection) => {
				expect(connection.request.url).toEqual('http://localhost:5000/api/sellers/');
				expect(connection.request.method).toEqual(RequestMethod.Post);
				const options = new ResponseOptions({ body: testableProductData });

				connection.mockRespond(new Response(options));
			});

			subject.addNewSeller(testableSeller).subscribe(() => { done(); });
		});
	});
});

