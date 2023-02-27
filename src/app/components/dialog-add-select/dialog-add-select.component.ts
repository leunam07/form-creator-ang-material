import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilsService } from 'src/app/services/utils.service';
import { ValidationsService } from 'src/app/services/validation.service';
import { DialogOneInputComponent } from '../dialog-one-input/dialog-one-input.component';
import { FieldOptions } from '../drag-drop/drag-drop.component';

@Component({
  selector: 'app-dialog-add-select',
  templateUrl: './dialog-add-select.component.html',
  styleUrls: ['./dialog-add-select.component.css'],
})
export class DialogAddSelectComponent {
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
    if(this.data.options?.length){
      this.data.options.forEach(opt => {
        this.optionsFormArray.push(new FormControl({ value: opt.value }));
        this.options.push(opt.value);
      })
      this.titleModal = 'Modificar lista de selección';
    }else{
      this.titleModal = 'Agregar lista de selección';
    }
    this.formBeginTemplate.reset({
      ...this.fieldDefault,
      ...this.data,
    });
  }

  options: string[] = [];
  optionsForm?: FormArray;
  titleModal = 'Lista de selección';

  formBeginTemplate = this.fb.group({
    field: ['', Validators.required],
    name: ['', Validators.required],
    label: ['', Validators.required],
    options: this.fb.array([], [Validators.required]),
    required: [true, Validators.required],
  });

  fieldDefault = {
    field: '',
    name: '',
    label: '',
    options: [],
    required: true,
  };

  get optionsFormArray() {
    return this.formBeginTemplate.get('options') as FormArray;
  }

  onClose(): void {
    this.dialog.openDialogs[0].close();
  }

  validField(fieldName: string, form: FormGroup) {
    return this.vs.validField(form, fieldName);
  }

  showAddOptionForm() {
    console.log(this.options);
    this.optionsForm = this.optionsFormArray;
    const refDialog = this.dialog.open(DialogOneInputComponent, {
      disableClose: true,
    });
    refDialog.afterClosed().subscribe((value) => {
      if (this.options.includes(value)) {
        console.log('Ya existe ', value);
      } else {
        this.optionsFormArray.push(new FormControl({ value }));
        this.options.push(value);
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
