import { TemplateRef } from "@angular/core";


  // spolecna obecna cast - enums
  export enum ControlTheme {
    Native = 'Native',
    DataGrid = 'DataGrid',
    Desktop = 'Desktop'
  };
  export enum UpdateOn {
    Change = 'Change',
    Blur = 'Blur'
  };

  export enum LabelStyle {
    Bold = 'Bold',
    Italics = 'Italics',
  };

  export enum LabelPosition {
    Left = 'Left',
    Top = 'Top',
    Right = 'Right'
  };

  export enum Color {
    Default = 'Default',
    Warning = 'Warning',
    Error = 'Error',
    Info = 'Info'
  };

  export enum ToolTipPosition {
    Left = 'Left',
    Top = 'Top',
    Right = 'Right',
    Bottom = 'Bottom',
  };

  export enum TooltipTrigger {
    click = "click",
    hover = "hover"
  };

  export enum TooltipType {
    Array = 'array',
    Object = 'object',
    Template = 'template'
  }

  export interface ITitledTooltip {
    title?: string;
    text?: string;
    color?: Color;	// barva pozadí tooltipu
  };

  export enum ComponentName {
    Checkbox = "Checkbox",
    Radiobutton = 'Radiobutton',
    Button = 'Button',
    Fieldset = 'Fieldset',
    Tooltip = 'Tooltip',
    MultiComboCox = 'MultiComboCox',
    Combobox = 'Combobox',
    Textbox = 'Textbox',
    Numeric = 'Numeric',
    Autocomplete = 'Autocomplete',
    Label = 'Label',

  }

  export enum SettingMethods {
    Always = 'Always',
    Never = 'Never',
    Dynamically = 'Dynamically',
  };

  export enum TooltipTriggerScrollStrategy {
    close = 'close',
    reposition = 'reposition',
  };

  //zpusob zobrazeni tlacitka - viz Figma
  export enum ButtonDisplayMode {
    Primary = 'Primary',
    Secondary = 'Secondary',
    Tertiary = 'Tertiary',
    SmallPrimary = 'SmallPrimary',
    SmallSecondary = 'SmallSecondary',
    Link = 'Link',
  };

  export enum SvgIcons {
    CheckMark = 'checkmark.svg',
    Warning = 'warning.svg',
    Code = 'code.svg',
    Barcode = 'barcode.svg',
    Bookmark = 'bookmark.svg',
    BarChart = 'bar-chart.svg',
    BarChartFill = 'bar-chart-fill.svg',
    DownArrow = 'down-arrow.svg',
    Clear = 'clear.svg',
    UpArrow = 'up-arrow.svg',
    ShowHidden = 'show-hidden.svg',
    Increment = 'increment.svg',
    Decrement = 'decrement.svg',
    All = 'all.svg',
  };

  export const SVG_ICONS_PATH = "./src/assets/"


  export enum LetterCaseModification {
    lowercase = 'lowercase',
    uppercase = 'uppercase'
  }


  // INTERFACES


  export type LabelType = string | ILabel;

  export interface ILabel {
    label: string;
    labelPosition?: LabelPosition;
    labelStyle?: LabelStyle;
    // TODO: label size in vw ?
    labelSize?: number;
    required?: boolean;
    iconLeft?: SvgIcons;
    iconRight?: SvgIcons;
  };

  export interface IFormControlInputParams {
    updateOn?: UpdateOn;
    label?: LabelType;
    forcedErrorState?: boolean;
    forcedWarningState?: boolean;
    readonly?: boolean;
    required?: boolean;
  };

  // specifikace pro CheckBox - params
  export interface ICheckBoxParams extends IFormControlInputParams {
    indeterminate?: boolean;
    threestateOutput?: boolean;
    ignoreHover?: boolean;
  };

  // specifikace pro komponenty slouzici pro vyber hodnot z kolekce
  export type ItemSelectKeyType = number | string;

  export interface IElementPosition {
    name: string;
    position?: string;
    active: boolean;
  }

  export interface IItemSelect {
    label?: string;
    tooltip?: TooltipParamsType;
  };

  export interface IItemSelectWithKey extends IItemSelect {
    key: ItemSelectKeyType;
  };

  //typ vstupni kolekece - objekt - znemoznuje vlozeni duplicitnich klicu
  export type ItemSelectObject<K extends ItemSelectKeyType = string, T extends IItemSelect = IItemSelect> = Record<K, T>


  //conditional type pro konverzi kolekce radiobuttonů z objektu do pole
  export type ItemSelectKeyTypeArray<ItemsType extends ItemSelectObject> =
    ItemsType extends ItemSelectObject ? IItemSelectWithKey[] : unknown;

  //conditional type pro konverzi z pole s klici do objektove kolekce radiobuttonů
  export type ItemSelectKeyTypeObject<ItemsType extends IItemSelectWithKey[]> =
    ItemsType extends IItemSelectWithKey[] ? ItemSelectObject : unknown;

  export type RadioButtonKeyType = ItemSelectKeyType;
  export interface IRadioButtonParams extends IFormControlInputParams {
    vertical?: boolean;
  };


  //typ vstupni kolekce - objekt - znemoznuje vlozeni duplicitnich klicu
  export type RadioButtons<K extends RadioButtonKeyType = string, T extends IItemSelect = IItemSelect> = ItemSelectObject<K, T>

  export type ComboboxKeyType = ItemSelectKeyType;


  export type ComboboxItemsObject<K extends ComboboxKeyType = string, T extends IItemSelect = IItemSelect> = ItemSelectObject<K, T>

  export type MultiComboboxKeyType = ItemSelectKeyType;

  export interface IMultiComboboxParams extends IFormControlInputParams {
    maxSelectedItems?: number;
    minSelectedItems?: number;
  };

  export type MultiComboboxItemsObject<K extends MultiComboboxKeyType = string, T extends IItemSelect = IItemSelect> = ItemSelectObject<K, T>

  export interface IButtonParams {
    displayMode?: ButtonDisplayMode;
    readonly?: SettingMethods;
    focused?: SettingMethods;
    allowHoverEfect?: boolean;
    allowNotAllowedCursor?: boolean;
    allowPressedEfect?: boolean;
    required?: boolean;
  }

  export interface IFieldsetParams {
    label?: string;
  };

  export type TooltipParamsType = TooltipContentType | ITooltip;

  export type TooltipContentType = string | string[];

  export interface ITooltip {
    content: TooltipContentType;
    description?: string;

    type?: TooltipType;
    color?: Color;
    icon?: SvgIcons;
    position: ToolTipPosition;
    originPosition?: ToolTipPosition;
    openTrigger?: TooltipTrigger;
    closeTrigger?: TooltipTrigger;
  };

  export const TOOLTIP_OPEN_DELAY = 400;
  export const TOOLTIP_CLOSE_DELAY = 15000;

export interface IInputboxGeneralParams {
    showDeleteButton?: boolean;
    leftIcon?: SvgIcons;
    rightIcon?: SvgIcons;
    supressHoverEffect?: boolean;
    setSelectionWhenFocused?: boolean;
    placeholder?: string | number;
    innerDescription?: string;
  };

  export interface INumericParams extends IFormControlInputParams, IInputboxGeneralParams {
    decimalPlaces?: number;
    autoFillingDecimalPlaces?: boolean;
    minValue?: number;
    maxValue?: number;
    step?: number;
  };

  export interface ITextBoxParams extends IFormControlInputParams, IInputboxGeneralParams {
    password?: IpasswordInput | boolean;
    letterCaseModification?: LetterCaseModification;
    regexpmask?: string;
    maxLength?: number;
  };

  export const SEARCH_INPUT_ICON: iInputIcon = {
    iconName: SvgIcons.CheckMark,
    hideOnFocus: true,
  }

  export interface iInputIcon {
    iconName: SvgIcons;
    hideOnFocus?: boolean
  }

  export interface IpasswordInput {
    showVisibleIcon: boolean;
    charactersVisible?: boolean;
  }

  export const SCROLLBAR_DROPDOWN_OPTIONS = 8;




