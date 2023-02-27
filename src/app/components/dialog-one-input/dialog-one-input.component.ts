import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UtilsService } from 'src/app/services/utils.service';
import { ValidationsService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-dialog-one-input',
  templateUrl: './dialog-one-input.component.html',
  styleUrls: ['./dialog-one-input.component.css'],
})
export class DialogOneInputComponent {
  constructor(
    private fb: FormBuilder,
    private vs: ValidationsService,
    private dialog: MatDialog
  ) {}

  form = this.fb.group({
    value: ['', Validators.required]
  })

  onClose(): void {
    this.dialog.openDialogs[0].close();
  }

  validField(fieldName: string, form: FormGroup) {
    return this.vs.validField(form, fieldName);
  }

  onSubmit(){
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.dialog.openDialogs[1].close(this.form.value.value);
  }

}
