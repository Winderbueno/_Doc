//#region Angular, Material, NgRx
import { Injectable } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
//#endregion


@Injectable({ providedIn: 'root' })
export class FormatService {

  constructor(private currencyPipe: CurrencyPipe) { }

  // Convert value
  ToDecimal(value: number): number {

    let decimalValue = this.currencyPipe
      .transform(value, 'USD')?.
      replace("$", "").
      replace(",", "");

    return decimalValue ? parseFloat(decimalValue) : 0;
  }
}
