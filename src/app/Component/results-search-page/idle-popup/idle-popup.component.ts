import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IdlePopupConstants} from "./idle-popup.constants";
import { WHATSAPPCONSTANT } from 'src/app/shared/constant';

declare function expandBox(email: string): void

@Component({
  selector: 'app-idle-popup',
  templateUrl: './idle-popup.component.html',
  styleUrls: ['./idle-popup.component.scss']
})
export class IdlePopupComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombres: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  onSubmit() {
    this.submitted = true
    if (this.form.valid)
      this.activeModal.close({
        action: IdlePopupConstants.SEND_EMAIL,
        email: this.form.get('email')!.value,
        nombres: this.form.get('nombres')!.value
      })
  }

  onOpenChat() {
    //expandBox(this.form.get('email')!.value)
    window.open(`https://api.whatsapp.com/send/?phone=${WHATSAPPCONSTANT.cellphone}`, '_blank');
  }

}
