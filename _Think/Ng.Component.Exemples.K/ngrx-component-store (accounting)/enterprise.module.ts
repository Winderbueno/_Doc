//#region Angular, Material, NgRx
import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
//#endregion

//#region Module
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormModule } from '@form/form.module';
import { MaterialModule } from '@material/material.module';
//#endregion

//#region This
import * as Components from './component';
import * as Effects from './effect';
import * as Pages from './page';
//#endregion


@NgModule({
  imports: [
    /* Angular */
    CommonModule,

    /* Module */
    FlexLayoutModule,
    FormModule,
    MaterialModule,

    /* Effect */
    EffectsModule.forFeature(
      Effects.Effects
    ),
  ],
  providers: [
    CurrencyPipe
  ],
  declarations: [
    Pages.HomePage,
    Components.Components
  ],
  exports: [
    Pages.HomePage
  ]
})
export class EnterpriseModule { }