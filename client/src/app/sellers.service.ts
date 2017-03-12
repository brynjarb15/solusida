import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable} from 'rxjs/Observable';
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
	imagePath: number;
}

@Injectable()
export class SellersService {

	constructor(private http: Http) { }

	getSellerProduct(id: number): Observable<SellerProduct[]> {
		return this.http.get(`http://localhost:5000/api/sellers/${id}/products`)
		.map(response => {
			return <SellerProduct[]> response.json();
		});
	}

	getSellers(): Observable<Seller[]> {
		return this.http.get('http://localhost:5000/api/sellers')
		.map(response => {
			return <Seller[]> response.json();
		});
	}
	getSellerById(id: number): Observable<Seller> {
		return this.http.get(`http://localhost:5000/api/sellers/${id}`)
		.map(response => {
			return <Seller> response.json();
		});
	}

	addProduct(theProduct: SellerProduct, id: number): Observable<SellerProduct> {
		return  this.http.post(`http://localhost:5000/api/sellers/${id}/products`, theProduct)
		.map(response => {
			return <SellerProduct> response.json();
		});
	}

	editProduct(theProduct: SellerProduct, id: number): Observable<SellerProduct> {
		const productId = theProduct.id;
		return this.http.put(`http://localhost:5000/api/sellers/${id}/products/${productId}`, theProduct)
		.map(response => {
			return <SellerProduct> response.json();
		});
	}
	
	addNewSeller(seller: Seller): Observable<Seller> {
		return this.http.post('http://localhost:5000/api/sellers/', seller)
		.map(response => {
			return <Seller> response.json();
		});
	}

}
