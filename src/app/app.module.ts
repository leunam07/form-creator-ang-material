import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Material
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DialogAddSelectComponent } from './components/dialog-add-select/dialog-add-select.component';
import { DialogAddCheckboxComponent } from './components/dialog-add-checkbox/dialog-add-checkbox.component';
import { DialogAddInputComponent } from './components/dialog-add-input/dialog-add-input.component';
import { DialogAddTextAreaComponent } from './components/dialog-add-text-area/dialog-add-text-area.component';
import { DialogOneInputComponent } from './components/dialog-one-input/dialog-one-input.component';


@NgModule({
  declarations: [
    AppComponent,
    AppBarComponent,
    DragDropComponent,
    DialogAddInputComponent,
    DialogAddTextAreaComponent,
    DialogAddSelectComponent,
    DialogAddCheckboxComponent,
    DialogOneInputComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
