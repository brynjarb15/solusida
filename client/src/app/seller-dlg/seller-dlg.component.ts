import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export interface Seller {
	name: string;
	id: number;
	category: string;
	imagePath: string;
}

@Component({
	selector: 'app-seller-dlg',
	templateUrl: './seller-dlg.component.html',
	styleUrls: ['./seller-dlg.component.css']
})
export class SellerDlgComponent implements OnInit {

	seller = {
		name: '',
		id: -1,
		category: '',
		imagePath: ''
	};
	parentClass = 'has-danger';
	childClass = 'form-control-danger';

	isNameClass = '';
	isNameParentClass = '';
	isCategoryClass = '';
	isCategoryParentClass = '';
	isImagePathClass = '';
	isImagePathParentClass = '';

	notName = false;
	notCategory = false;
	notImagePath = false;

	constructor(public activeModal: NgbActiveModal) { }

	ngOnInit() {
	}

	onCancel() {
		this.activeModal.dismiss();
	}

	onOk() {
		if (this.validateInput()) {
			this.activeModal.close(this.seller);
		}
	}

	validateInput(): boolean {
		if (this.seller.name === '') {
			this.isNameParentClass = this.parentClass;
			this.isNameClass = this.childClass;
			this.notName = true;
		} else {
			this.isNameParentClass = '';
			this.isNameClass = '';
			this.notName = false;
		}
		if (this.seller.category === '') {
			this.isCategoryParentClass = this.parentClass;
			this.isCategoryClass = this.childClass;
			this.notCategory = true;
		} else {
			this.isCategoryParentClass = '';
			this.isCategoryClass = '';
			this.notCategory = false;
		}
		if (this.seller.imagePath === '') {
			this.isImagePathParentClass = this.parentClass;
			this.isImagePathClass = this.childClass;
			this.notImagePath = true;
		} else {
			this.isImagePathParentClass = '';
			this.isImagePathClass = '';
			this.notImagePath = false;
		}
		return !(this.notImagePath || this.notCategory || this.notName);
	}
}
