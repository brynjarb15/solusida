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

	// bootstrap class used in the html
	parentClass = 'has-danger';
	childClass = 'form-control-danger';

	isNameClass = '';
	isNameParentClass = '';

	notName = false;

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

	// there must be a name but the rest is optional
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
		return !(this.notName);
	}
}
