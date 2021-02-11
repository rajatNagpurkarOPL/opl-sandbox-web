import { Component, Input } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';


@Component({
    selector: 'app-validation-messages',
    template: `<div class="text-danger" *ngIf="errorMessage">{{errorMessage}}</div>`
})
export class ValidationMessagesComponent {
    @Input() control: FormControl;
    constructor() { }

    getValidatorErrorMessage(validatorName, validatorValue) {
        const config = {
          required: 'This field is required',
          invalidNumber: 'Input should be an integer value',
          alphaNumericAllowed: 'Only apha numeric input is allowed',
          numericAllowed: 'Only numeric values are allowed',
          emailTaken: 'Email id already taken',
          minlength: `Minimum length should be ${validatorValue.requiredLength} characters`,
          maxlength: `Maximum length should be ${validatorValue.requiredLength} characters`,
          min: `Min value should be more than ${validatorValue.min}`,
          max: `Max value should be less than ${validatorValue.max}`,
          pattern: `Pattern not match`,
        };
    
        return config[validatorName];
      }

    get errorMessage() {
        for (const propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && (this.control.dirty || this.control.touched)) {
                let errorMsg = this.validatorErrorMessage(this.control, propertyName);
                if (errorMsg == null) {
                    errorMsg = this.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
                }
                return errorMsg;
            }
        }

        return null;
    }

    validatorErrorMessage(c: AbstractControl, propertyName): string | null {
        const formGroup = c.parent.controls;
        const controlName = Object.keys(formGroup).find(name => c === formGroup[name]);
        if (controlName != null || controlName !== undefined) {
            //return this.commonMethod.getErrorMessage(controlName, propertyName) || null;
            return null;
        }
        return null;
    }
}
