import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appPasswordValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordValidatorDirective,
      multi: true,
    },
  ],
})
export class PasswordValidatorDirective implements Validator {
  private password: string;
  private uppercase = '[A-Z]';
  private lowercase = '[a-z]';
  private numbers = '[0-9]';
  private special = '[!@#$%&]';

  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.dirty) {
      let errors: ValidationErrors = {};
      this.password = control.value;
      if (!this.atLeastOneCharacterOf(this.uppercase))
        errors.noUppercase = 'Pelo menos uma letra maiuscúla';
      if (!this.atLeastOneCharacterOf(this.lowercase))
        errors.noLowercase = 'Pelo menos uma letra minuscúla';
      if (!this.atLeastOneCharacterOf(this.numbers))
        errors.noNumber = 'Pelo menos um número';
      if (!this.atLeastOneCharacterOf(this.special))
        errors.noSymbol = 'Pelo menos um símbolo !@#$&';
      if (this.password.length < 8)
        errors.minimumCharacters = 'Pelo menos 8 caracteres!';
      return errors;
    }
    return null;
  }

  atLeastOneCharacterOf(pattern: string): boolean {
    const regex = new RegExp(`(?=.*${pattern})`);
    return this.password.match(regex) !== null;
  }
}
