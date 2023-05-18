import { Directive, ElementRef, Input, OnChanges, Optional, Renderer2 } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { SVG_ICONS_PATH, SvgIcons } from '../api-model';


@Directive({
  selector: 'img[uiIcon],svg-icon[uiIcon]'
})
export class IconDirective implements OnChanges {

  @Input('uiIcon') iconName: SvgIcons;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Optional() private svgIconComponent: SvgIconComponent
  ) { }

  ngOnChanges() {
    const iconSource = SVG_ICONS_PATH + this.iconName;
    
    if (this.svgIconComponent) {
      this.svgIconComponent.src = iconSource;
      this.svgIconComponent.ngOnInit();

    } else
     {
      this.renderer.setAttribute(this.elementRef.nativeElement, "src", iconSource);
    }
  }
}


