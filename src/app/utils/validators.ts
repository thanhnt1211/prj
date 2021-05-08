import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value;
    const confirmPassword: string = control.get('confirmPassword').value;
    // compare is the password math
    if (confirmPassword !== '' && password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirmPassword').setErrors({ NoPasswordMatch: true });
    }
  }
}
