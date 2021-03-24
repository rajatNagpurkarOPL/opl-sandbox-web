import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { DrawerMenuComponent } from '../component/common/drawer-menu/drawer-menu.component';

@Directive({
  selector: '[appDrawerMenu]',  
})
export class DrawerMenuDirective implements OnInit {

  @Input() item: any;
  @Input() expandFlagKey: boolean;
  @Input() rotationFlagKey: boolean;
  componentRef: any;
  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) { }
  ngOnInit(): void {
    const factory = this.resolver.resolveComponentFactory(DrawerMenuComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.item = this.item;
    this.componentRef.instance.expandFlagKey = this.expandFlagKey;
    this.componentRef.instance.rotationFlagKey = this.rotationFlagKey;
  } 
}
