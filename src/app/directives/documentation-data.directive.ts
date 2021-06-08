import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { DocumentationDataComponent } from '../component/documentation-data/documentation-data.component';

@Directive({
  selector: '[appDocumentationData]'
})
export class DocumentationDataDirective implements OnInit {

  @Input() jsonData: any;
    componentRef: any;
    constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) { }
    ngOnInit(): void {
      const factory = this.resolver.resolveComponentFactory(DocumentationDataComponent);
      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.jsonData = this.jsonData;
    } 

}
