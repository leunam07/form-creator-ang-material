import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilsService } from 'src/app/services/utils.service';
import { ValidationsService } from 'src/app/services/validation.service';
import { DialogOneInputComponent } from '../dialog-one-input/dialog-one-input.component';
import { FieldOptions } from '../drag-drop/drag-drop.component';

@Component({
  selector: 'app-dialog-add-checkbox',
  templateUrl: './dialog-add-checkbox.component.html',
  styleUrls: ['./dialog-add-checkbox.component.css']
})
export class DialogAddCheckboxComponent {
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
    if(this.data.checks?.length){
      this.data.checks.forEach(opt => {
        this.checksFormArray.push(new FormControl({ value: opt.value }));
        this.checks.push(opt.value);
      })
      this.titleModal = 'Modificar cajas de selección múltiple';
    }else{
      this.titleModal = 'Agregar cajas de selección múltiple';
    }
    this.formBeginTemplate.reset({
      ...this.fieldDefault,
      ...this.data,
    });
  }

  checks: string[] = [];
  checksForm?: FormArray;
  titleModal = 'Cajas de selección múltiple';

  formBeginTemplate = this.fb.group({
    field: ['', Validators.required],
    name: ['', Validators.required],
    label: ['', Validators.required],
    checks: this.fb.array([], [Validators.required]),
    required: [true, Validators.required],
  });

  fieldDefault = {
    field: '',
    name: '',
    label: '',
    checks: [],
    required: true,
  };

  get checksFormArray() {
    return this.formBeginTemplate.get('checks') as FormArray;
  }

  onClose(): void {
    this.dialog.openDialogs[0].close();
  }

  validField(fieldName: string, form: FormGroup) {
    return this.vs.validField(form, fieldName);
  }

  showAddOptionForm() {
    this.checksForm = this.checksFormArray;
    const refDialog = this.dialog.open(DialogOneInputComponent, {
      disableClose: true,
    });
    refDialog.afterClosed().subscribe((value) => {
      if (this.checks.includes(value)) {
        console.log('Ya existe ', value);
      } else {
        this.checksFormArray.push(new FormControl({ value }));
        this.checks.push(value);
      }
    });
  }

  openFormBuilder(): void {
    this.formBeginTemplate.markAllAsTouched();
    if (this.formBeginTemplate.invalid) return;
    this.dialog.openDialogs[0].close(this.formBeginTemplate.value);
    this.formBeginTemplate.reset(this.fieldDefault);
  }
}
