/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil, tap } from 'rxjs/operators';
import { GlobalComponent } from '../../global';

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
	@Input() disabled =  false;
	@Input() isRequired = false;
	@Input() notSelect = true;
	@Input() value:any = '';
	@Input() fullLabel = false;
	@Input() isSearch = false;
	@Input() isLeft=true;
	@Input() default:any;
	@Input() isFilter = false;
	@Input() isEmitChanges = false;
	@Input() isNationality = false;
	@Input() tabIndex=0;
	@Output() seletedItem = new EventEmitter();
	@Output() setErrorSelect = new EventEmitter();
	@ViewChildren('inputRef') inputRefs: QueryList<ElementRef>;

	isVisibleOptions=false;
	valueName='';

	showItems = false;
	listFilter: Item[] = [];
	valueSearch = new FormControl('');
	idRand=Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	isClickItem=false;
	isFocus=false;
	private destroy$ = new Subject<unknown>();

	constructor(){}

	ngOnInit(): void {
		if (this.isSearch) {
			this.onChangeSearch();
		}
		if(this.default!==''){
			if(this.isNationality){
				const nameCountry = GlobalComponent.listCountries.find(item=>item.code==this.default)?.name;
				this.valueName= nameCountry || ''; 
			}else{
				this.valueName=this.listItems.filter(item=>item.value==this.default)[0].name;
			}
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

	onKeyUp($event:KeyboardEvent){
			const itemFind= this.listItems.find(opcion => opcion.name.charAt(0).toLowerCase() === $event.key.toLowerCase())
			if(itemFind){
				const inputRef = this.inputRefs.toArray()[this.listItems.indexOf(itemFind)];
				inputRef.nativeElement.click();
				this.clickItem(itemFind);
			}
		
			if($event.key == 'Enter'){
				this.isVisibleOptions=!this.isVisibleOptions;
			}

			this.isFocus=true
	}

	onBlurEvent(){
		setTimeout(() => {
			if (this.valueName=='' && this.isRequired && !this.isClickItem) {
				this.setErrorSelect.emit();
			}
		}, 100);
		this.isVisibleOptions=false;
	}

	clickItem(item:Item){
		this.valueName=item.name;
		this.isVisibleOptions=false;
		this.isClickItem=true;
		if(this.isEmitChanges)  this.seletedItem.emit(item.name);
		this.valueSearch.setValue('');
	}

	clickSelect(){
		if(!this.disabled) this.isVisibleOptions = !this.isVisibleOptions
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

	resetValue(){
		this.valueName='';
	}

	@ViewChild('selectBox') selectBox: ElementRef;
	@HostListener('document:click', ['$event'])
	blurSelect(event: MouseEvent) {
		if (this.selectBox && !this.selectBox.nativeElement.contains(event.target)) {
			this.isVisibleOptions=false;
		}
	}
	@HostListener('document:keydown', ['$event'])
	onTabKey(event: KeyboardEvent) {
		if (this.selectBox && event.key=='Tab' && this.selectBox.nativeElement.contains(event.target) && this.isFocus) {
			this.setErrorSelect.emit();
			this.isFocus=false;
		}
	}
}
