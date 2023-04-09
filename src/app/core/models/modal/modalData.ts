import { TemplateRef } from "@angular/core";
import { ModalColor } from "./modalColor";
export class ModalData {
  title?: string;
  primaryInformation?: string;
  secondaryInformation?: string;
  image?: string;
  border?: any;
  content?: TemplateRef<any>;
  primaryButton?: string;
  secondaryButton?: string;
  color?: ModalColor;
  letterColor?: ModalColor;
}
