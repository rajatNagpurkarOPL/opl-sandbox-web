import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from "@angular/core";
import { TreeGridTableComponent } from "../component/controls/tree-grid-table/tree-grid-table.component";

@Directive({
    selector: '[appTreeGridTable]',  
  })
  export class TreeGridTableDirective implements OnInit {
  
    @Input() jsonData: any;
    componentRef: any;
    constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) { }
    ngOnInit(): void {
      const factory = this.resolver.resolveComponentFactory(TreeGridTableComponent);
      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.jsonData = this.jsonData;
    } 
  }
  