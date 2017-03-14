import { Component, OnInit } from '@angular/core';
import { SellersService, Seller, SellerProduct } from './sellers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerDlgComponent } from './seller-dlg/seller-dlg.component';
import { ToastrService, ToastrConfig } from 'ngx-toastr';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'app works!';

	constructor(private toastrConfig: ToastrConfig) {
		 toastrConfig.preventDuplicates = true;
	}

	ngOnInit() {
	}
}
