//#region Angular, Material, NgRx
import { Component, OnInit } from '@angular/core';
//#endregion

//#region This
import { AccountingStore } from '../accounting/accounting.store';
import { IncomeTaxRow } from '../accounting/income-tax-row.model';
//#endregion


@Component({
  selector: 'income-tax',
  templateUrl: './income-tax.component.html',
  styleUrls: ['./income-tax.component.scss'],
  //providers: [AccountingStore],
})
export class IncomeTaxComponent implements OnInit {
  
  dataSource: IncomeTaxRow[] = [];
  displayedColumns: string[] = ['range', 'rate', 'amount'];
  
  constructor(private readonly accountingStore: AccountingStore) {}

  ngOnInit() {
    this.accountingStore.ds$.subscribe(ds => 
      this.dataSource = ds
    );
  }
}