import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
/**
 * @description
 * Valida que las contraseñas ingresadas en los campos 'password' y 'confirmPassword' sean iguales.
 * Si son iguales, retorna null; de lo contrario, retorna un objeto de error con la clave 'notSame'.
 * @returns {ValidatorFn} Función validadora que se puede usar en un formulario reactivo.
 * @example
 * ```typescript
 * this.form = this.fb.group({
 *   password: ['', Validators.required],
 *   confirmPassword: ['', Validators.required]
 * }, { validators: passwordsIgualesValidator });
 * ```
 */
export const passwordsIgualesValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const pass = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;

  return pass === confirm ? null : { notSame: true };
};
/**
 * @description
 * Valida que la fecha de nacimiento ingresada sea mayor o igual a una edad mínima especificada.
 * Si la edad es válida, retorna null; de lo contrario, retorna un objeto de error con la clave 'minAge'.
 * @param {number} minAge - Edad mínima requerida.
 * @returns {ValidatorFn} Función validadora que se puede usar en un formulario reactivo.
 * @example
 * ```typescript
 * this.form = this.fb.group({
 *   birthDate: ['', [Validators.required, minAgeValidator(18)]]
 * });
 * ```
  */
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
