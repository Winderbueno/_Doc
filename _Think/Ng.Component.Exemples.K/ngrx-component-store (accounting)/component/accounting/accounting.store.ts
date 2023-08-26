//#region NgRx
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
//#endregion

//#region This
import { IncomeTaxRow } from './income-tax-row.model';
import { FormatService } from '../../service/format.service';
//#endregion

export interface ComponentState {
  datasource: IncomeTaxRow[],
  thresholds: number[],
  rates: number[]
}

@Injectable()
export class AccountingStore extends ComponentStore<ComponentState> {

  constructor(private format: FormatService) {
    super({ 
      datasource: [{ range: 'Total', amount: 0 }],
      thresholds: [10225, 26070, 74545, 160336],
      rates: [11, 30, 41, 45]
    });
  }

  /* Selector */
  readonly ds$: Observable<IncomeTaxRow[]> = this.select(state => state.datasource);
  
  /* Updater */
  readonly initDatasource = this.updater(
    (state) => {

      let ds:IncomeTaxRow[] = [ ...state.datasource ];

      state.thresholds.forEach((threshold, i) => {
        ds.splice(
          ds.length - 1, 0,
          {
            range: threshold + ' - ' + (state.thresholds[i+1] === undefined ? 'N/A' : state.thresholds[i+1]),
            rate: state.rates[i]
          }
        );
      });

      return ({ ...state, datasource: ds })
    });
  
  
  readonly compute = this.updater(
    (state, CA: number) => {

      // Apply tax allowance on CA
      let CA_Abattu = CA * (1 - 0.34);

      // Compute income tax amount by slices
      let totalAmount: number = 0;
      state.datasource.forEach((row, i) => {
        row.amount = 0;
        if (CA_Abattu > state.thresholds[i + 1]) {
          row.amount = this.format.ToDecimal((state.thresholds[i + 1] - state.thresholds[i]) * row.rate! / 100);
        }
        else if (CA_Abattu > state.thresholds[i]) {
          row.amount = this.format.ToDecimal((CA_Abattu - state.thresholds[i]) * row.rate! / 100);
        }
        totalAmount = row.amount + totalAmount;
      });

      // Set total line
      let totalRow = state.datasource[state.datasource.length - 1];
      totalRow.amount = this.format.ToDecimal(totalAmount);
      totalRow.rate = Math.trunc(this.format.ToDecimal(totalAmount * 100 / CA));

      return ({ ...state, datasource: state.datasource })
    });

  // /* Effect */
  // readonly computeIncomeTax = this.effect(
  //   (ds$: Observable<Row[]>) => {
  //     return ds$.pipe(
  //       switchMap(ds => {
  //         // Do Treatment
  //         let CA_Abattu = (90000 as unknown as number) * (1 - 0.34);
  //         return ds;
  //       })      
  //     );
  //   });
}
