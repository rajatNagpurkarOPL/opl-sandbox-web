import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-error',
  templateUrl: './print-error.component.html',
  styleUrls: ['./print-error.component.scss']
})
export class PrintErrorComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('control')
  control: any;

  // tslint:disable-next-line: no-input-rename
  @Input('submitted')
  submitted: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.control);
  }

}
