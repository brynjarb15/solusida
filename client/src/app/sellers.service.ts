import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/rx';

export interface Seller {
	id: number;
	name: string;
	category: string;
	imagePath: string;
}

export class SellerProduct {
	id: number;
	name: string;
	price: number;
	quantitySold: number;
	quantityInStock: number;
	imagePath: string;
}

@Injectable()
export class SellersService {

	constructor(private http: Http) { }

	getSellerProduct(id: number): Observable<SellerProduct[]> {
		return this.http.get(`http://localhost:5000/api/sellers/${id}/products`)
			.map(response => {
				return <SellerProduct[]>response.json();
			});
	}

	getTop10ForSeller(id: number): Observable<SellerProduct[]> {
		return this.http.get(`http://localhost:5000/api/sellers/${id}/products`, )
			.map(response => {
				return <SellerProduct[]>response.json().sort((a, b) => {
															if (a.quantitySold < b.quantitySold) {
																return 1;
															}
															if (a.quantitySold > b.quantitySold) {
																return -1;
															}
															if (a.quantitySold === b.quantitySold) {
																return 0;
															};
														}).slice(0,10);
		});
	}

	getSellers(): Observable<Seller[]> {
		return this.http.get('http://localhost:5000/api/sellers')
			.map(response => {
				return <Seller[]>response.json();
			});
	}
	getSellerById(sellerId: number): Observable<Seller> {
		return this.http.get(`http://localhost:5000/api/sellers/${sellerId}`)
			.map(response => {
				return <Seller>response.json();
			});
	}

	addProduct(theProduct: SellerProduct, sellerId: number): Observable<SellerProduct> {
		return this.http.post(`http://localhost:5000/api/sellers/${sellerId}/products`, theProduct)
			.map(response => {
				return <SellerProduct>response.json();
			});
	}

	editProduct(theProduct: SellerProduct, sellerId: number): Observable<SellerProduct> {
		const productId = theProduct.id;
		return this.http.put(`http://localhost:5000/api/sellers/${sellerId}/products/${productId}`, theProduct)
			.map(response => {
				return <SellerProduct>response.json();
			});
	}

	editSeller(seller: Seller): Observable<Seller> {
		const sellerId = seller.id;
		console.log(`http://localhost:5000/api/sellers/${sellerId}`);
		return this.http.put(`http://localhost:5000/api/sellers/${sellerId}`, seller)
			.map(response => {
				return <Seller>response.json();
			})
	}

	addNewSeller(seller: Seller): Observable<Seller> {
		return this.http.post('http://localhost:5000/api/sellers/', seller)
			.map(response => {
				return <Seller>response.json();
			});
	}

}
