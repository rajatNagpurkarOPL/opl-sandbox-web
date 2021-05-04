import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-custom-error-state-matcher',
  templateUrl: './custom-error-state-matcher.component.html',
  styleUrls: ['./custom-error-state-matcher.component.scss']
})
export class CustomErrorStateMatcherComponent implements OnInit,ErrorStateMatcher {

  constructor() { }
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
  ngOnInit(): void {
  }

}
