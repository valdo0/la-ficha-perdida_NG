import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordsIgualesValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const pass = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;

  return pass === confirm ? null : { notSame: true };
};
export const minAgeValidator = (minAge: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const birthDate = new Date(control.value);
    if (isNaN(birthDate.getTime())) return null;

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= minAge ? null : { minAge: { requiredAge: minAge, actualAge: age } };
  };
};
