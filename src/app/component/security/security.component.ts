import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Constant } from 'src/app/common-utils/Constant';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {
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
    this.router.navigate([this.constant.ROUTE_URL.SECURITY, page]);
  }

}
