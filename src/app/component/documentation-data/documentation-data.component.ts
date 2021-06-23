import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { SchemaData, TreeNode } from '../controls/tree-grid-table/tree-grid-table.component';

@Component({
  selector: 'app-documentation-data',
  templateUrl: './documentation-data.component.html',
  styleUrls: ['./documentation-data.component.scss']
})
export class DocumentationDataComponent implements OnInit {

  @Input() jsonData: any;
  componentRef: any;
  apiSchema: any[] = [];
  apiBody: any = {};
  apiHeader: any = {};

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
    this.dataSource.data = this.jsonData.apiSchemaData;
    this.apiBody = this.jsonData.apiBodyData;
    this.apiHeader = this.jsonData.apiHeaderData;
  }

  tabClick(tab) {
    if(tab.index==0){
      // this.getApiRequestSchema('createLoanApplicationsRequest');
      // this.getApiResponseSchema('createLoanApplicationsResponse');
    }else if(tab.index==1){
    }else if (tab.index ==2){
    }
  }

}
