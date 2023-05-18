import { ComponentRef, Directive, ElementRef, HostListener, Input, OnChanges, OnDestroy, SimpleChanges } from "@angular/core";
import { Overlay, OverlayConfig, OverlayRef, FlexibleConnectedPositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TooltipComponent } from "../tooltip/tooltip.component";
import { ITooltip, TOOLTIP_CLOSE_DELAY, TOOLTIP_OPEN_DELAY, ToolTipPosition, TooltipParamsType, TooltipTrigger } from "../api-model";
import { setTooltip } from "./default-tooltip";



@Directive({
  selector: '[uiTooltip]',
})
export class TooltipParamsDirective implements OnChanges, OnDestroy {
  @Input() public tooltipParams: TooltipParamsType;

  private overlayRef: OverlayRef;
  private componentRef: ComponentRef<TooltipComponent>;

  private displayedTooltip: ITooltip;

  private creatingId: any;
  private destroyingId: any;

  @HostListener('click' )
  public click() {

    if(this.displayedTooltip?.openTrigger === TooltipTrigger.click)
      this.createOverlay()
  }

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
      if(this.displayedTooltip?.closeTrigger === TooltipTrigger.click) {
        if (!targetElement) return;

        const clickedInside = this.elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) this.destroyOverlay();
      }
  }

  @HostListener('mouseenter')
  public mouseEnter() {
    if(this.displayedTooltip?.openTrigger === TooltipTrigger.hover) {
          this.createOverlay()
    }
  }


  @HostListener('mouseleave')
  public mouseLeave() {
    if (this.displayedTooltip?.closeTrigger === TooltipTrigger.hover)
      this.destroyOverlay();
  }

  @HostListener('wheel')
  public wheel() {
      this.destroyOverlay();
  }

  constructor(
    private overlay: Overlay,
    private elementRef: ElementRef,
    ){

    }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    const tooltip = changes?.['uiTooltip'].currentValue;

    if(!tooltip) return;

    this.displayedTooltip = setTooltip(tooltip);
  }

  private createOverlay() {
    clearTimeout(this.creatingId);

    this.creatingId = setTimeout(()=> {
      if(!this.displayedTooltip.originPosition) {
        this.displayedTooltip.originPosition = this.displayedTooltip.position;
      }
      this.displayedTooltip.position = this.displayedTooltip.originPosition
      this.displayedTooltip.position = this.changePositionIfNeeded(this.displayedTooltip.position, this.elementRef);

      const overlayConfig = new OverlayConfig({
        positionStrategy: this.setPositionStrategy(this.displayedTooltip.position, this.elementRef),
      });

      this.overlayRef = this.overlay.create(overlayConfig);

      this.componentRef = this.overlayRef.attach(new ComponentPortal(TooltipComponent));

      this.componentRef.instance.tooltip = this.displayedTooltip;


      this.destroyOverlayAfterDelay()
    }, TOOLTIP_OPEN_DELAY);
  }

  ngOnDestroy() {
    this.destroyOverlay()
  }

  private changePositionIfNeeded(position: ToolTipPosition, elementRef: ElementRef):ToolTipPosition {
      const rect = elementRef.nativeElement.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const availableSpace = {
        top: rect.top + 5,
        bottom: viewportHeight - rect.bottom + 5,
        left: rect.left + 5,
        right: viewportWidth - rect.right + 5,
      };

      const minWidth = 150;

      // find the best position clockwise
      if (position === ToolTipPosition.Top) {
        if (availableSpace.top < minWidth) {
          if (availableSpace.right >= minWidth) position = ToolTipPosition.Right;
          else if (availableSpace.bottom >= minWidth) position = ToolTipPosition.Bottom;
          else if (availableSpace.left >= minWidth) position = ToolTipPosition.Left;
        }

      } else if (position === ToolTipPosition.Bottom) {
        if (availableSpace.bottom < minWidth) {
          if (availableSpace.left >= minWidth) position = ToolTipPosition.Left;
          else if (availableSpace.top >= minWidth) position = ToolTipPosition.Top;
          else if (availableSpace.right >= minWidth) position = ToolTipPosition.Right;
        }

      } else if (position === ToolTipPosition.Left) {
        if (availableSpace.left < minWidth) {
          if (availableSpace.top >= minWidth) position = ToolTipPosition.Top;
          else if (availableSpace.right >= minWidth) position = ToolTipPosition.Right;
          else if (availableSpace.bottom >= minWidth) position = ToolTipPosition.Bottom;
        }

      } else if (position === ToolTipPosition.Right) {
        if (availableSpace.right < minWidth) {
          if (availableSpace.bottom >= minWidth) position = ToolTipPosition.Bottom;
          else if (availableSpace.left >= minWidth) position = ToolTipPosition.Left;
          else if (availableSpace.top >= minWidth) position = ToolTipPosition.Top;
        }
      }
      return position;
  }

  private setPositionStrategy(
    position: ToolTipPosition,
    connectedElement: ElementRef
  ): FlexibleConnectedPositionStrategy {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(connectedElement)
      .withFlexibleDimensions()
      .withPush()

    if (position === ToolTipPosition.Top) {
      positionStrategy.withPositions([
        { originX: "center", originY: "top", overlayX: "center", overlayY: "bottom" },
      ]);
    }

    if (position === ToolTipPosition.Bottom) {
      positionStrategy.withPositions([
        { originX: "center", originY: "bottom", overlayX: "center", overlayY: "top" },
      ]);
    }

    if (position === ToolTipPosition.Right) {
      positionStrategy.withPositions([
        { originX: "end", originY: "center", overlayX: "start", overlayY: "center" },
      ]);
    }

    if (position === ToolTipPosition.Left) {
      positionStrategy.withPositions([
        { originX: "start", originY: "center", overlayX: "end", overlayY: "center" },
      ]);
    }

    return positionStrategy;
  }

  private destroyOverlayAfterDelay() {
    clearTimeout(this.creatingId);

    if (this.overlayRef)
      this.destroyingId = setTimeout(() => {
        this.overlayRef.dispose();
        this.overlayRef?.detach();
      }, TOOLTIP_CLOSE_DELAY)

  }

  private destroyOverlay() {
    clearTimeout(this.creatingId);
    clearTimeout(this.destroyingId);

    if (this.overlayRef)
        this.overlayRef.dispose();
        this.overlayRef?.detach();

  }
}
