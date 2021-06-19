import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tryout-response',
  templateUrl: './tryout-response.component.html',
  styleUrls: ['./tryout-response.component.scss']
})
export class TryoutResponseComponent implements OnInit {

  @Input() jsonData:any;
  response:any;
  constructor() { }

  ngOnInit(): void {
    this.response = this.jsonData;
  }

}
