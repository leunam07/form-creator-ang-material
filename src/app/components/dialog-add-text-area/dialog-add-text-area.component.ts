import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilsService } from 'src/app/services/utils.service';
import { ValidationsService } from 'src/app/services/validation.service';
import { FieldOptions } from '../drag-drop/drag-drop.component';

@Component({
  selector: 'app-dialog-add-text-area',
  templateUrl: './dialog-add-text-area.component.html',
  styleUrls: ['./dialog-add-text-area.component.css'],
})
export class DialogAddTextAreaComponent implements OnInit {
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
    this.formBeginTemplate.reset({
      ...this.fieldDefault,
      ...this.data,
    });
    this.data.name !== ''
      ? (this.titleModal = 'Modificar Campo Área de Texto')
      : (this.titleModal = 'Agregar Campo Área de Texto');
    this.formBeginTemplate.reset({
      ...this.fieldDefault,
      ...this.data,
    });
  }

  titleModal = 'Campo Área de Texto';

  formBeginTemplate = this.fb.group({
    field: ['', Validators.required],
    name: ['', Validators.required],
    label: ['', Validators.required],
    required: [true, Validators.required],
  });

  fieldDefault = {
    field: '',
    name: '',
    label: '',
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
