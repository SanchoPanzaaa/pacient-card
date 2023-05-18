import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, Renderer2, SimpleChanges, TemplateRef, ViewChild } from "@angular/core";
import { ITooltip, TooltipType } from "../api-model";

@Component({
  selector: 'ui-tooltip-component',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent implements OnInit, OnChanges {
  @Input() public tooltip: ITooltip;

  protected tooltipArray: string[] = [];
  protected templateRef: TemplateRef<any>;

  protected typeArray: TooltipType = TooltipType.Array;
  protected typeObject: TooltipType = TooltipType.Object;
  protected typeTemplate: TooltipType = TooltipType.Template;

  @ViewChild('tooltipEl', { static: true })
  public tooltipEl: any;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    if(this.tooltip.type === this.typeArray) {
      this.tooltipArray = this.tooltip.content as string[];
      this.tooltipArray.length = this.tooltipArray.length > 5 ? 5 : this.tooltipArray.length;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes)
  }
}
