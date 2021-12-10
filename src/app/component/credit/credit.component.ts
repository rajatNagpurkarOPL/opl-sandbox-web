import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from 'src/app/common-utils/Constant';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss']
})
export class CreditComponent implements OnInit {
      
  currentPage : string = "";
  public readonly constant : any = null;
  constructor(private route : ActivatedRoute,private router : Router) { 
    this.constant = Constant; 
   }

  ngOnInit(): void {
    this.currentPage = this.route.snapshot.paramMap.get('pageName');
  }
 
  goTo(page : string){
    this.currentPage = page;
    this.router.navigate([this.constant.ROUTE_URL.CREDIT, page]);
  }

}
