import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, forwardRef, OnChanges, Injector, Inject, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlName, FormGroupDirective, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, Validator, ValidatorFn, Validators } from '@angular/forms';
import { FocusIndicatorState } from '../focus-indicator/focus-indicator/focus-indicator.component';
import { Color, IElementPosition, ITextBoxParams, ITooltip, IpasswordInput, SvgIcons, ToolTipPosition, iInputIcon } from '../api-model';

@Component({
  selector: 'ui-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextboxComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: TextboxComponent
    }
  ],
})
export class TextboxComponent implements OnChanges, ControlValueAccessor, Validator {
  @Input() params: ITextBoxParams;
  @Input() validators: ValidatorFn[] = [];

  protected value: string;
  protected iconRight: SvgIcons;
  protected iconLeft: SvgIcons;
  protected clearIcon: SvgIcons = SvgIcons.Clear;
  protected displayIcon: SvgIcons = SvgIcons.ShowHidden;

  protected focusIndicatorState: FocusIndicatorState = FocusIndicatorState.Clean;
  protected elementStatePosition: IElementPosition[] = [];

  protected focusState = false;
  public tooltip: ITooltip;
  protected passwordInput: IpasswordInput = {showVisibleIcon: false};
  protected inputType = 'text';

  @ViewChild('inputField', { static: true }) inputElement: ElementRef;

  public control: FormControl;

  @Input() regexFilter: RegExp;

  @Output() valueChange = new EventEmitter<string>();
  @Output() iconLeftClick = new EventEmitter<void>();
  @Output() iconRightClick = new EventEmitter<void>();


  protected hideOnFocus = false;

  private onchange: (_: string | number) => void = () => {};
  private ontouch: () => void = () => {};
  private onblur: (_: string | number) => void = () => {};

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(Injector) private injector: Injector,


    ) {

   }

  ngOnChanges(changes: any): void {
    const change = changes.params.currentValue;
    // ELEMENT STATE
    if(change?.leftIcon) {
      this.iconLeft = (change.leftIcon as SvgIcons) ?? (change.leftIcon as iInputIcon).iconName;
    }

    if(change?.rightIcon) {
      this.iconRight = (change.rightIcon as SvgIcons);
      this.elementStatePosition.push({name: 'rightIcon', active: true});
    }

    if(change?.showDeleteButton)
      this.elementStatePosition.push({name: 'showDeleteButton', active: true});

    if(change?.password) {
      this.inputType = 'password';
      this.passwordInput = typeof change.password === 'boolean' ? this.passwordInput : change.password as IpasswordInput;
      this.elementStatePosition.push({name: 'password', active: true});
    }

    if(change?.innerDescription)
      this.elementStatePosition.push({name: 'innerDescription', active: true});

    this.updatePositions();

    if(change?.tooltip) {
      this.tooltip = {
        position: ToolTipPosition.Top,
        content: 'tooltip TBD',
        color: change.forcedErrorState ? Color.Error : change.forcedWarningState ? Color.Warning : Color.Default,
      }
    }


    this.setCurrentState();
  }

  setCurrentState() {
    if(this.params?.forcedErrorState) {
      this.focusIndicatorState = FocusIndicatorState.Error;
    } else if(this.params?.forcedWarningState) {
      this.focusIndicatorState = FocusIndicatorState.Warning;
    } else {
      this.focusIndicatorState = FocusIndicatorState.Clean;
    }
  }

  getElementPosition(elementName: string): string | undefined {
    const element = this.elementStatePosition.find(
      (e) => e.name === elementName && e.active
    );
    return element ? element.position : undefined;
  }

  setComponentControl() {
    const injectedControl = this.injector.get(NgControl);

    if (injectedControl instanceof FormControlName) {
      this.control = this.injector.get(FormGroupDirective).getControl(injectedControl);
      this.control.statusChanges.subscribe((s) => {
        if (s == "INVALID") {
          this.params.forcedErrorState = true;
          this.focusIndicatorState = FocusIndicatorState.Error;
          this.changeDetectorRef.detectChanges();
        } else {
          this.params.forcedErrorState = false;
          this.focusIndicatorState = FocusIndicatorState.Clean;
          this.changeDetectorRef.detectChanges();
        }
      })
    }
  }

  showPassword() {
    this.inputType = 'text' ? 'password' : 'text';
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.params?.maxLength && this.value.length >= this.params?.maxLength) {
      event.preventDefault();
    }
  }

  setSelectionWhenFocused() {
    return this.params?.setSelectionWhenFocused;
  }

  onInputChange(event: any) {

    this.value = event.target.value;

    if (this.params?.letterCaseModification === 'uppercase') {
      this.value = event.target.value.toUpperCase();
    }

    if (this.params?.letterCaseModification === 'lowercase') {
      this.value = event.target.value.toLowerCase();
    }

    if (this.params.maxLength && this.value.length >= this.params.maxLength) {
      event.preventDefault();
    }

    this.valueChange.emit(this.value);
  }

  updatePositions() {
    this.elementStatePosition.forEach((element, index) => {
      element.position = `right-${index}`;
    });
  }

  clearInput() {
    this.value = '';
    this.onchange(this.value);}

  writeValue(value: string): void {

    this.value = value;
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onchange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onchange = fn;
  }

  onFocus() {
    this.focusState = true;
    if (this.setSelectionWhenFocused()) {
      this.inputElement?.nativeElement.select();
    }
  }

  onFocusOut(){
    this.focusState = false;
  }

  onBlur() {
    if (this.regexFilter && !this.regexFilter.test(this.value)) {
      this.writeValue('');
    }
  }

  onIconLeftClick() {
    this.iconLeftClick.emit();
  }

  onIconRightClick() {
    this.iconRightClick.emit();
  }

  emitValue(event: Event) {
    let value = (event.target as HTMLInputElement).value;

    if (this.params?.maxLength && value.length > this.params?.maxLength) {
      value = value.substring(0, this.params.maxLength);
    }

    this.value = value;
    if (this.ontouch) {
      this.ontouch();
    }
  }

  validate(): { [key: string]: any } | null {
    return Validators.compose(this.validators);
  }
}

