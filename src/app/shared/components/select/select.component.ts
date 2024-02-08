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
		@Input() isMonth=false;
		@Output() selectedItem = new EventEmitter();
		@Output() setErrorSelect = new EventEmitter();
		@ViewChildren('inputRefs') inputRefs: QueryList<ElementRef>;
		@ViewChild('contentList') contentList: ElementRef;

		isVisibleOptions=false;
		valueName='';

		showItems = false;
		listFilter: Item[] = [];
		valueSearch = new FormControl('');
		idRand=Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		isClickItem=false;
		isFocus=false;
		getScreenWidth = window.innerWidth;
		currentInputRef = -1;
		findItem: Item;
		keyUpwords: string = '';

		private destroy$ = new Subject<unknown>();
		private debounceKeyUpSubject: Subject<string> = new Subject<string>();

		constructor() {
			this.debounceKeyUpSubject
					.pipe(
						debounceTime(400),
						distinctUntilChanged()
					)
					.subscribe((searchTerm) => {
						this.searchFnTerm(searchTerm);
					});
		}

		ngOnInit(): void {
			if (this.isSearch) {
				this.onChangeSearch();
			}
			if(this.default!==''){
				if(this.isNationality){
					const nameCountry = GlobalComponent.listCountries.find(item=>item.code==this.default)?.name;
					this.valueName= nameCountry || ''; 
				} else {
					this.valueName=this.listItems.filter(item=>item.value==this.default)[0].name;
				}
			}
		}

		ngOnChanges(changes: SimpleChanges): void{
			if (changes['listItems'] && changes['listItems'].currentValue.length > 0) {
				this.listFilter = this.listItems;
			}

			if (changes['value'] && changes['value'].currentValue == '') {
				this.valueName=''
			}
		}
		onKeyUp($event: KeyboardEvent) {
			$event.preventDefault();
			let itemFind;
			const eventKey = $event.key; 

			if (eventKey == 'Tab') {
				this.isVisibleOptions = false;
			}

			if (eventKey == 'Enter') {	
				this.isVisibleOptions = !this.isVisibleOptions;
			}

			if (eventKey == 'ArrowDown' || eventKey == 'ArrowUp') {
				this.contentList.nativeElement.focus();
				if (eventKey == 'ArrowDown' && this.currentInputRef < this.listFilter.length - 1) {
					this.currentInputRef++
				}
				if (eventKey == 'ArrowUp' && this.currentInputRef > 0) {
					this.currentInputRef--
				}
				itemFind = this.listFilter[this.currentInputRef]

				const inputRef = this.inputRefs.toArray()[this.listItems.indexOf(itemFind)];
				inputRef.nativeElement.click();
				
				const direction = eventKey == 'ArrowDown' ? 1 : -1;
        this.scrollOptionsList(direction);
				
				this.clickItem(itemFind, true);

			} else if (/^[a-zA-Z\d]$/.test(eventKey)) { 	
				// existe en el valueName anteriormente
				if (this.findItem?.name.length) {
					const currentFindItem = this.listItems.find((opcion: Item) => {
						if (opcion.name.toLowerCase() === this.valueName.toLowerCase()) {
							return opcion
						}
						return 0;
					});
					if (!currentFindItem) {
						return;
					}
				}

				// existe el item
				this.keyUpwords += eventKey;

				this.debounceKeyUpSubject.next(this.keyUpwords);
			}
			this.isFocus=true
		}

		searchFnTerm(searchTerm: string): void {
			let currentFindItem: Item | undefined = this.listItems.find((opcion: Item, index: number) => {
				if (opcion.name.toLowerCase().startsWith(searchTerm.toLowerCase())) {
					this.currentInputRef = index
					return opcion;
				}
				return undefined;
			})
			if (!this.findItem?.name.length && currentFindItem) { // no tengo un valor anterior 
				const inputRef = this.inputRefs.toArray()[this.listItems.indexOf(currentFindItem)];
				inputRef.nativeElement.click();
				inputRef.nativeElement.scrollIntoView({ behavior: 'smooth',  block: 'start' });
			} else { // si tengo un valor anterior
				if (!currentFindItem) {
					currentFindItem = this.findItem;
				}
				this.currentInputRef = this.listItems.indexOf(currentFindItem);
			}
			this.clickItem(currentFindItem);
			this.keyUpwords = '';
		}

		onBlurEvent(){
			setTimeout(() => {
				if (this.valueName=='' && this.isRequired && !this.isClickItem) {
					this.setErrorSelect.emit();
				}
			}, 100);
			this.isVisibleOptions=false;
		}

		clickItem(item:Item, visible = false){
			this.valueName = item.name;
			this.findItem = item;
			this.isVisibleOptions=visible;
			this.isClickItem = true;
			if(this.isEmitChanges) this.selectedItem.emit(item.name);
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

		private scrollOptionsList(direction: number): void {
			// Calculate the scroll amount based on direction
			const scrollAmount = direction * 34.4; // Adjust this value based on your preference
			if (this.contentList) {
				this.contentList.nativeElement.scrollTop += scrollAmount;
      }
		}

		resetValue() {
			this.valueName = '';
		}

		changeVisibleOptions() {
			this.isVisibleOptions = !this.isVisibleOptions
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

		@HostListener('window:resize', ['$event'])
		onResize() {
			if (this.getScreenWidth !== window.innerWidth) {
				this.getScreenWidth = window.innerWidth;
			}
		}
	}