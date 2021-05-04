import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { TreeGridTableDirective } from 'src/app/directives/tree-grid-table.directive';

export interface SchemaData {
  attributeName: string;
  type: string;
  validation: string;
  isRequired:boolean;
  description: string;
  isDomain?: boolean;
  domainData?: SchemaData[];
}

export interface TreeNode {
  attributeName: string;
  type: string;
  validation: string;
  isRequired:boolean;
  description: string;
  isDomain?: boolean;
  expandable: boolean;
  level: number;
}

@Component({
  selector: 'app-tree-grid-table',
  templateUrl: './tree-grid-table.component.html',
  styleUrls: ['./tree-grid-table.component.scss']
})

export class TreeGridTableComponent implements OnInit {

  @Input() jsonData: any;
  componentRef: any;

  //@ContentChild(TreeGridTableDirective, {static: true}) child: TreeGridTableDirective;

  displayedColumns: string[] = ['attributeName', 'type' , 'validation' , 'isRequired' , 'description'];

  private transformer = (node: SchemaData, level: number) => {
    return {
      expandable: !!node.domainData && node.domainData.length > 0,
      attributeName: node.attributeName,
      type: node.type,
      validation: node.validation,
      isRequired:node.isRequired,
      description: node.description,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<TreeNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, 
      node => node.expandable, node => node.domainData);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  
  constructor() {
   }

  ngOnInit(): void {
    this.dataSource.data = this.jsonData;
  }

}
