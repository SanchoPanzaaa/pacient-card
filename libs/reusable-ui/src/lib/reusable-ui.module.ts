import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabeledValueComponent } from './labeled-value/labeled-value.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipComponent } from './tooltip/tooltip.component';
import { LabelComponent } from './label/label.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { MultiDropdownComponent } from './multi-dropdown/multi-dropdown.component';
import { TextboxComponent } from './textbox/textbox.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { IconComponent } from './icon/icon.component';
import { DataTableComponent } from './data-table/data-table.component';
import { TileComponent } from './tile/tile.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [LabeledValueComponent, TooltipComponent, LabelComponent, DropdownComponent, MultiDropdownComponent, TextboxComponent, RadioButtonComponent, CheckboxComponent, IconComponent, DataTableComponent, TileComponent, ButtonComponent],
  exports: [LabeledValueComponent]
})
export class ReusableUiModule {}
