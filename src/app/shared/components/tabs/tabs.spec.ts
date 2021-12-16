import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TabsComponent } from './tabs.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../../material.module';
import { FilterModule } from '../filter/filter.module';
import { FiltersafeModule } from '../filtersafe/filtersafe.module';
import { PopUpPasajeroModule } from '../pop-up-pasajero/pop-up-pasajero.module';
import { CustomAdapter } from 'src/app/Services/datepicker/customAdapter.service';
import { CustomDateParserFormatter } from 'src/app/Services/datepicker/customDateParserFormatter.service';
import { I18n, CustomDatepickerI18nService } from 'src/app/Services/datepicker/customDatepickerI18n.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsComponent ],
      imports:[
          RouterTestingModule.withRoutes([]),
          HttpClientTestingModule,
          MaterialModule,
          FilterModule,
          FiltersafeModule,
          NgbModule,
          HttpClientJsonpModule,
          FormsModule,
          ReactiveFormsModule,
          PopUpPasajeroModule,
          BrowserAnimationsModule
        ],
      providers:[
        { provide: NgbDateAdapter, useClass: CustomAdapter },
        { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
        I18n,
        {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18nService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('Debe crearse', () => {
    expect(component).toBeTruthy();
  });



});
