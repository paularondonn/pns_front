import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyDirective } from './directives/only.directive';

@NgModule({
  declarations: [OnlyDirective],
  imports: [
    CommonModule,
  ],
  exports: [
    OnlyDirective
  ]
})
export class CoreModule {
}
