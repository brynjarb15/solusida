/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {  ToastrConfig } from 'ngx-toastr';

describe('AppComponent', () => {

	const mockToastrConfig = {
		preventDuplicates: Boolean
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				AppComponent
			],
			providers: [ {
				provide: ToastrConfig,
				useValue: mockToastrConfig
			}],
			schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
		});
		TestBed.compileComponents();
	});

	it('should create the app', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));

	it(`should have as title 'Sölusíða'`, async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app.title).toEqual('Sölusíða');
	}));

	it('should render title in a h1 tag', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('h1').textContent).toContain('Sölusíða');
	}));
});
