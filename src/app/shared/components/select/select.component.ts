/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil, tap } from 'rxjs/operators';

interface Item {
	value: any;
	name: string;
}
@Component({
	selector: 'app-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class SelectComponent implements OnInit, OnChanges {
	@Input() labelError = '';
	@Input() label = '';
	@Input() listItems: Item[] = [];
	@Input() placeholder = 'Seleccionar';
	@Input() name?: any = 'select';
	@Input() isGroup = false;
	@Input() labelStroke = false;
	@Input() disabled = false;
	@Input() isRequired = false;
	@Input() notSelect = true;
	@Input() value:any = '';
	@Input() fullLabel = false;
	@Input() isSearch = false;

	isVisibleOptions=false;
	valueName='';

	showItems = false;
	isSelected = false;
	listFilter: Item[] = [];
	valueSearch = new FormControl('');
	idRand=Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	private destroy$ = new Subject<unknown>();

	constructor(){}

	ngOnInit(): void {
		if (this.isSearch) {
			this.onChangeSearch();
		}
	}

	ngOnChanges(changes: SimpleChanges):void{
		if (changes['listItems'] && changes['listItems'].currentValue.length > 0) {
			this.listFilter = this.listItems;
		}

		if (changes['value'] && changes['value'].currentValue == '') {
			this.valueName=''
		}
	}

	clickItem(item:Item){
		this.valueName=item.name;
		this.isVisibleOptions=false;
		this.valueSearch.setValue('');
	}

	clickOutside(){
		this.isVisibleOptions = false;
	}

	private onChangeSearch(): void {
		this.valueSearch.valueChanges
			.pipe(
				map((search) => search?.toLowerCase().trim()),
				map((search) => {
					if (search == undefined || search?.length <= 1) {
						this.listFilter = this.listItems;
					}
					return search;
				}),
				debounceTime(500),
				distinctUntilChanged(),
				filter((search) => search !== '' && search !== undefined && search?.length > 1),
				tap((search) => {
					if (search !== undefined) {
						this.listFilter = this.listItems.filter((item) => item.name.toLowerCase().includes(search));
					}
				}),
				takeUntil(this.destroy$)
			)
			.subscribe();
	}

	ngOnDestroy(): void {
		this.destroy$.next({});
		this.destroy$.complete();
	}
}
