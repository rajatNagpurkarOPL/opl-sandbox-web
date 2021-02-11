export interface Validator {
    name: string;
    validator: any;
    message: string;
  }
  export interface FieldConfig {
    label?: string;
    code?: string;
    inputType?: string;
    values?: any [];
    collections?: any;
    fieldType: string;
    value?: any;
    validations?: Validator[];
    fields ? :any [];
    data ? : any ;
  }