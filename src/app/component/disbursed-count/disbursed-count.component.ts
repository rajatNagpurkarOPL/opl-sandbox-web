import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disbursed-count',
  templateUrl: './disbursed-count.component.html',
  styleUrls: ['./disbursed-count.component.scss']
})
export class DisbursedCountComponent implements OnInit {
  selected = '';
  constructor() { }

  ngOnInit(): void {
  }

}
