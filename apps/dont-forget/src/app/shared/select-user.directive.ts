import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function selectUserValidator(username: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = username == control.value;

    const res = forbidden ? { forbiddenName: { value: control.value } } : null;
    
    return res;
  };
}
