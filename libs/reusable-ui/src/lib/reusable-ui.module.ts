import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabeledValueComponent } from './labeled-value/labeled-value.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [LabeledValueComponent],
  exports: [LabeledValueComponent]
})
export class ReusableUiModule {}
