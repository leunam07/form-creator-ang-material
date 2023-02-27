import { Injectable } from '@angular/core';

import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationsService {
  constructor() {}

  public onlyLetters = '[a-zA-Z ]*';
  public onlyNumbers = '[0-9]*';
  public emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  public nitPattern = /^[\d]{9}-{1}[\d]{1}$/;
  public idRequirementPattern = /^Id [0-9]{3}$/;
  public evaluatorsPattern = /^[A-C]{3}$/;
  public passwordPattern = 
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!"#$%&'()*+=,-./:;_<>¿?@])[A-Za-z\d!"#$%&'()*+=,-./:;_<>¿?@].{7,}/;
  public urlPattern = new RegExp(
    '^((ft|htt)ps?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?' + // port
      '(\\/[-a-z\\d%@_.~+&:]*)*' + // path
      '(\\?[;&a-z\\d%@_.,~+&:=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator

  validField(form: FormGroup, fieldName: string) {
    return (
      (form.get(fieldName)?.errors && form.get(fieldName)?.touched) || null
    );
  }

  validError(form: FormGroup, fieldName: string, typeError: string) {
    if (this.validField(form, fieldName)) {
      return form.get(fieldName)?.errors![typeError];
    }
    return false;
  }

  // areEquals(field1: string, field2: string) {
  //   return (formGroup: AbstractControl): ValidationErrors | null => {
  //     const pass1 = formGroup.get(field1)?.value;
  //     const pass2 = formGroup.get(field2)?.value;
  //     const error = { noAreEquals: true };
  //     const errorsField2 = formGroup.get(field2)?.errors;

  //     if (pass1 === '' || pass2 === '') {
  //       return null;
  //     }

  //     if (pass1 !== pass2) {
  //       formGroup.get(field2)?.setErrors({
  //         ...error,
  //         ...errorsField2,
  //       });
  //       return error;
  //     }

  //     delete errorsField2?.noAreEquals;
  //     const setErrorField2 = this.isObjEmpty(errorsField2)
  //       ? null
  //       : errorsField2;
  //     formGroup.get(field2)?.setErrors(setErrorField2!);
  //     return null;
  //   };
  // }

  validFile(file: File, maxSize: number, validExtensions: string[], control: AbstractControl) {
    let validFile = true;
    const filename = file.name.split('.').pop() || '';
    const sizeMax = 1024 * 1024 * maxSize;
    const validExtension = validExtensions.includes(filename);
    control?.setErrors(null);
    if (!validExtension) {
      control?.setErrors({ invalidExtension: true });
      validFile = false;
    }
    if (file?.size > sizeMax) {
      control?.setErrors({ invalidSize: true });
      validFile = false;
    }
    return validFile;
  }

  isObjEmpty(obj: any) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
  }
}
