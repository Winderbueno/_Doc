//#region Angular, Material, NgRx
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map } from 'rxjs/operators';
//#endregion

//#region Module
import * as fromForm from '@form/model';
import { SetValueAction } from 'ngrx-forms';
//#endregion


@Injectable()
export class IncomeEffects {

  computeCA$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SetValueAction.TYPE),
      filter((action: SetValueAction<fromForm.FormValue>) => action.controlId === 'Income.TJ'),
      map((action: SetValueAction<fromForm.FormValue>) => 
        new SetValueAction('Income.CA', (action.value as unknown as number) * 218)
      )
    )
  );

  constructor(private actions$: Actions) {}
}
