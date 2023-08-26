//#region Angular, Material, NgRx
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
//#endregion

//#region Module
import * as fromDialog from '@dialog/store';
import * as fromForm from '@form/store';
import { FormatService } from '@enterprise/service/format.service';
//#endregion

//#region This
import { AccountingStore } from '../accounting/accounting.store';
import { IncomeTaxComponent } from '../income-tax/income-tax.component';
import { IncomeTaxRow } from './income-tax-row.model';
//#endregion

export interface Row {
  description: string;
  rate?: number;
  amount?: number;
}

@Component({
  selector: 'accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.scss'],
  providers: [AccountingStore],
})
export class AccountingComponent {
  
  dataSource: Row[] = [
    { description: 'Cotisation Sociale', rate: 22, amount: 0 },
    { description: 'Formation Pro', rate: 0.2, amount: 0 },
    { description: 'Total', rate: 0, amount: 0 },
    { description: 'Income Tax', rate: 0, amount: 0 },
  ];

  dataSource2: IncomeTaxRow[] = [];

  displayedColumns: string[] = ['description', 'rate', 'amount'];

  openDialogAction = fromDialog.openDialogAction({ 
    component: Object.assign({}, IncomeTaxComponent)
  });
  
  constructor(
    public store: Store,
    private readonly accountingStore: AccountingStore,
    private format: FormatService) {

    this.accountingStore.initDatasource();

    this.store
      .select(fromForm.selectControlValue('Income', 'CA'))
      .subscribe(CA => {
        this.accountingStore.compute(CA as unknown as number);
      });

    this.store.select(fromForm.selectFormValue('Income'))
      .subscribe(incomeFormValue => {
        
        // Cotisation Sociale
        incomeFormValue.Acre ? this.dataSource[0].rate = 11 : this.dataSource[0].rate = 22;
        this.dataSource[0].amount = incomeFormValue.CA as number * this.dataSource[0].rate / 100;

        // Formation Pro
        this.dataSource[1].amount = incomeFormValue.CA as number * 0.2 / 100;

        this.dataSource[2].amount = this.format.ToDecimal(
          this.dataSource[0].amount + this.dataSource[1].amount);
      });

      this.accountingStore.ds$.subscribe(ds => 
        this.dataSource2 = ds
      );

      this.dataSource2;
  }
}