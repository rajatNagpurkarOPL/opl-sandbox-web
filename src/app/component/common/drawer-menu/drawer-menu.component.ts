import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common-utils/common-services/common.service';
import { DocumentationComponent } from 'src/app/component/documentation/documentation.component'
@Component({
  selector: 'app-drawer-menu',
  templateUrl: './drawer-menu.component.html',
  styleUrls: ['./drawer-menu.component.scss']
})
export class DrawerMenuComponent implements OnInit {

  @Input() item: any;
  @Input() arrayKey: string;
  @Input() expandFlagKey: string;
  @Input() rotationFlagKey: string;
  @Input() isExpanded: boolean;
  @Input() isShowing: boolean;
  @Input() subMenuClass: string;

  constructor(public commonService: CommonService,public docuComp : DocumentationComponent) {     
  }
  ngOnInit(): void {}    

  mouseenter(item : any) {
    if(this.docuComp.selectedMenuItem != item.code){
      item.cssClass = "current-active";
    }
  }

  mouseleave(item : any) {
    if(this.docuComp.selectedMenuItem != item.code){
      item.cssClass = "";
    }
  }
}
