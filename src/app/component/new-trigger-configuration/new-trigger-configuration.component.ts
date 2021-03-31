import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-trigger-configuration',
  templateUrl: './new-trigger-configuration.component.html',
  styleUrls: ['./new-trigger-configuration.component.scss']
})
export class NewTriggerConfigurationComponent implements OnInit {
  selected = '';
  constructor() { }

  ngOnInit(): void {
  }

}
