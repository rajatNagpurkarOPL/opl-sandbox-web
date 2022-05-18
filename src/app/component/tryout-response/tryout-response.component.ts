import { Component, Input, OnInit } from '@angular/core'; 
import { Clipboard } from "@angular/cdk/clipboard";
import { Utils } from 'src/app/common-utils/common-services/utils.service';

@Component({
  selector: 'app-tryout-response',
  templateUrl: './tryout-response.component.html',
  styleUrls: ['./tryout-response.component.scss']
})
export class TryoutResponseComponent implements OnInit {

  @Input() jsonData:any;
  constructor(private clipBoard: Clipboard,public utils: Utils) { }

  ngOnInit(): void {
  }
 
  copyContentAppId(text: any) { 
      if(text != undefined || text != null) {
          this.clipBoard.copy(text); 
          this.utils.successSnackBar("Response  Copied");  
      }else {
        this.utils.errorSnackBar("Response data is empty");  
      }
        
  }

}
