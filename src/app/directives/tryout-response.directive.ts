import { ComponentFactoryResolver, Directive, Input, ViewContainerRef } from '@angular/core';
import { TryoutResponseComponent } from '../component/tryout-response/tryout-response.component';

@Directive({
  selector: '[appTryoutResponse]'
})
export class TryoutResponseDirective {
  @Input() jsonData: any;
  componentRef: any;
  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) { }
  ngOnInit(): void {
    const factory = this.resolver.resolveComponentFactory(TryoutResponseComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.jsonData = this.jsonData;
  }
}
