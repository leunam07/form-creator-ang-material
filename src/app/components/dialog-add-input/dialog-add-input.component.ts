import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilsService } from 'src/app/services/utils.service';
import { ValidationsService } from 'src/app/services/validation.service';
import { FieldOptions } from '../drag-drop/drag-drop.component';

@Component({
  selector: 'app-dialog-add-input',
  templateUrl: './dialog-add-input.component.html',
  styleUrls: ['./dialog-add-input.component.css'],
})
export class DialogAddInputComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private vs: ValidationsService,
    private utils: UtilsService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: FieldOptions
  ) {}

  ngOnInit(): void {
    this.formBeginTemplate.controls.label.valueChanges.subscribe((value) => {
      this.formBeginTemplate.controls.name.setValue(
        this.utils.toSnakeCase(value!)
      );
    });
    this.data.name !== ''
    ? (this.titleModal = 'Modificar campo de entrada de datos')
    : (this.titleModal = 'Agregar campo de entrada de datos');
  this.formBeginTemplate.reset({
    ...this.fieldDefault,
    ...this.data,
  });
    this.formBeginTemplate.reset({
      ...this.fieldDefault,
      ...this.data,
    });
  }

  titleModal = 'Campo de entrada de datos';

  formBeginTemplate = this.fb.group({
    field: ['', Validators.required],
    name: ['', Validators.required],
    label: ['', Validators.required],
    type: ['', Validators.required],
    required: [true, Validators.required],
  });

  fieldDefault = {
    field: '',
    name: '',
    label: '',
    type: '',
    required: true,
  };

  onClose(): void {
    this.dialog.closeAll();
  }

  validField(fieldName: string, form: FormGroup) {
    return this.vs.validField(form, fieldName);
  }

  openFormBuilder(): void {
    this.formBeginTemplate.markAllAsTouched();
    if (this.formBeginTemplate.invalid) return;
    this.dialog.openDialogs[0].close(this.formBeginTemplate.value);
    this.formBeginTemplate.reset(this.fieldDefault);
  }
}
