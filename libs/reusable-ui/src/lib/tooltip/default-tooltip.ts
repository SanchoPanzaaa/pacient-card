import { TemplateRef } from "@angular/core";
import { Color, ComponentName, ITooltip, ToolTipPosition, TooltipTrigger, TooltipType } from "../api-model";

export function setTooltip(tooltip: string | string[] | ITooltip | TemplateRef<any>): ITooltip  {
  const defaultTooltip = DefaultTooltip;

  if(typeof tooltip === 'string') {
    return {
      ...defaultTooltip,
      content: tooltip,
  }} else if(Array.isArray(tooltip)) {
    return {
      ...defaultTooltip,
      content: tooltip,
      type: TooltipType.Array,
      }
  }
  else if((tooltip as ITooltip)) {
    const obj = tooltip as ITooltip;

  if(Array.isArray(obj.content)) {
      return {
        ...defaultTooltip,
        type: TooltipType.Array,
        ...(tooltip as ITooltip),
        color: Color.Default,
      }
    } else {
      return {
        type: TooltipType.Object,
        content: obj.content ?? defaultTooltip.content,

        description: obj.description ?? defaultTooltip.description,

        color: obj.color ?? defaultTooltip.color,
        icon: obj.icon ?? defaultTooltip.icon,

        position: obj.position ?? defaultTooltip.position,
        openTrigger: obj.openTrigger ?? defaultTooltip.openTrigger,
        closeTrigger: obj.closeTrigger ?? defaultTooltip.closeTrigger,

      }
    }
  }
  return defaultTooltip;
}

export const DefaultTooltip = {
  componentName: ComponentName.Tooltip,

  content: 'Default tooltip',
  description: undefined,

  type: TooltipType.Object,
  color: Color.Default,
  icon: undefined,

  position: ToolTipPosition.Top,

  openTrigger: TooltipTrigger.hover,
  closeTrigger: TooltipTrigger.hover,

}
