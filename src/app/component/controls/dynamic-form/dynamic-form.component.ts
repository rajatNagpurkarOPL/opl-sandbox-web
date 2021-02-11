import {FormGroup,FormBuilder,Validators,FormControl, AbstractControl, ValidationErrors} from "@angular/forms";
import { Component, OnInit , EventEmitter, Input, Output} from '@angular/core';
import { FieldConfig } from "src/app/interface/field-interface";
import { ValidationRule } from "src/app/common-utils/common-services/validation-rule";
import { ObjectModel } from "src/app/common-utils/model/object-model";

@Component({
  exportAs: "appDynamicForm",
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  @Input() public fields: FieldConfig[] = [];
  @Input() public data: any = {};

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  public form: FormGroup;

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void { 
    this.form = this.createControl(); 
  }

  createControl() {
    //console.log("this.fields in dy form :: " , this.fields);
    const group = this.formBuilder.group({});
    console.log("here the fields are===>>>>" , this.data);
    this.fields.forEach(field => {
      //console.log("inner fields of dy form :: " , field);
      field.fields.forEach(data =>{
        if (data.fieldType === "button") return;
        const control = this.formBuilder.control(
          this.data[data.code],this.bindValidations(data.validations || [])
          );
        group.addControl(data.code, control);
      })
     /*  if (field.fieldType === "button") return;
      const control = this.formBuilder.control(
        field.value,this.bindValidations(field.validations || [])
        );
      group.addControl(field.code, control); */
    });
    return group;
  }

  bindValidations(validations: any) {
    //console.log("field validation checking :: " , validations);
    if (validations.length > 0) {
      /* const validList = []; */
      /* validations.forEach(valid => {
        //console.log("valid is :: " , valid.validationName);
        validList.push(valid.validationName);
      }); */

      const validList = this.getValidationFunctions(validations);
      ////console.log("compose is :: " , Validators.compose(validList))
      //return Validators.compose(validList);
      //console.log("validList final is :: " , validList);
      return validList;
    }
    return null;
  }

  getValidationFunctions(validationRuleStrings: Array<ObjectModel>): Array<(control: AbstractControl) => ValidationErrors | null> | null {
    const validationRules = [];
    //console.log("validationRuleStrings :: " , validationRuleStrings)
    for (const validationRuleStr of validationRuleStrings) {
      if (validationRules.indexOf(validationRuleStr) === -1) {
        let validationRule;
        // let validationRule = ValidationRule.validationRulesMap.get(validationRuleStr.key);
        // if (validationRule === undefined) {
        ValidationRule.setValidationsRulesMap(validationRuleStr.validationName, validationRuleStr.validationValue);
        validationRule = ValidationRule.validationRulesMap.get(validationRuleStr.validationName);
        // }
        //console.log("validationRule :: " , validationRule);
        validationRules.push(validationRule.validationFn);
      }
    }
    return validationRules.length > 0 ? validationRules : null;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

}
