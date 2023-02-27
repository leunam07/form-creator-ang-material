import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ValidationsService } from 'src/app/services/validation.service';
import { DialogAddCheckboxComponent } from '../dialog-add-checkbox/dialog-add-checkbox.component';
import { DialogAddInputComponent } from '../dialog-add-input/dialog-add-input.component';
import { DialogAddSelectComponent } from '../dialog-add-select/dialog-add-select.component';
import { DialogAddTextAreaComponent } from '../dialog-add-text-area/dialog-add-text-area.component';

type FieldTag = 'input' | 'textarea' | 'select' | 'checkbox';

export interface FieldOptions {
  field: FieldTag;
  name: string;
  label: string;
  type?: string;
  required: boolean;
  options?: any[];
  checks?: any[];
}

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css'],
})
export class DragDropComponent {
  title = 'ng-form-builder';
  currentIndex?: number;

  fields: FieldOptions[] = [
    {
      field: 'input',
      name: '',
      label: '',
      type: '',
      required: true,
    },
    {
      field: 'textarea',
      name: '',
      label: '',
      required: true,
    },
    {
      field: 'select',
      name: '',
      label: '',
      options: [],
      required: true,
    },
    {
      field: 'checkbox',
      name: '',
      label: '',
      checks: [],
      required: true,
    },
  ];

  fieldsAdded: FieldOptions[] = [];

  showFormResult = false;
  formResult = this.fb.group({});

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private vs: ValidationsService
  ) {}

  openDialogCreate(event: CdkDragDrop<any>): void {
    const selected = this.fields[event.previousIndex];
    const dialogRef = this.getDialogComponent(selected);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        copyArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        event.container.data[event.currentIndex] = result;
      }
    });
  }

  openDialogEdit(idx: number): void {
    const selected = this.fieldsAdded[idx];
    const dialogRef = this.getDialogComponent(selected);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fieldsAdded[idx] = result;
      }
    });
  }

  getDialogComponent(selected: FieldOptions) {
    const config: MatDialogConfig = {
      width: '45%',
      disableClose: true,
      data: selected,
    };

    switch (selected.field) {
      case 'checkbox':
        return this.dialog.open(DialogAddCheckboxComponent, config);
      case 'select':
        return this.dialog.open(DialogAddSelectComponent, config);
      case 'textarea':
        return this.dialog.open(DialogAddTextAreaComponent, config);
      case 'input':
      default:
        return this.dialog.open(DialogAddInputComponent, config);
    }
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.openDialogCreate(event);
    }
    this.showFormResult = false;
    this.formResult = this.fb.group({});
  }

  saveForm() {
    this.showFormResult = true;
    this.fieldsAdded.forEach((field) => {
      const validators = field.required ? [Validators.required] : [];
      if (field.field === 'checkbox') {
        const arrayF: any[] = [];
        field.checks!.forEach(() => arrayF.push([false]));
        this.formResult.addControl(
          field.name,
          this.fb.array(arrayF, validators)
        );
      } else {
        this.formResult.addControl(
          field.name,
          this.fb.control(null, validators)
        );
      }
    });
  }

  validField(fieldName: string, form: FormGroup) {
    return this.vs.validField(form, fieldName);
  }

  deleteItem(idx: number) {
    this.fieldsAdded.splice(idx, 1);
    this.showFormResult = false;
    this.formResult = this.fb.group({});
  }

  showResultDataInput() {
    this.formResult.markAllAsTouched();
    console.log({ valid: this.formResult.valid });
    if (this.formResult.valid) {
      const valueForm = { ...this.formResult.value } as any;
      for (const field of this.fieldsAdded) {
        if (field.field === 'checkbox') {
          const checksValues = valueForm[field.name].map(
            (x: any, i: number) => {
              return { [field.checks![i]['value']]: x };
            }
          );
          valueForm[field.name] = checksValues;
        }
      }
      console.log(valueForm);
      console.log(this.formResult.value);
    }
  }
}
