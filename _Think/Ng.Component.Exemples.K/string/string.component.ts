//#region Angular, Material, NgRx
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
//#endregion

//#region Module
import * as fromForm from '@form/store';
//#endregion

@Component({
  selector: 'string',
  templateUrl: './string.component.html'
})
export class StringComponent {
  formId = 'String';
  string:string = '';

  constructor(public store: Store) {
    this.store.select(fromForm.selectControlValue(this.formId, this.formId))
      .subscribe(s => this.string = s as unknown as string);
  }

  countWord(str: string): number {
    let readWord = false;
    let charStr = [...str.trim()];
    let wordCnt:number = 1;
    
    charStr.forEach(c => {
      if((readWord && (c==' ' || c=='\''))
        || (!readWord && c!=' ')) {
        
        readWord = !readWord;
        if(!readWord) wordCnt++;
      }      
    });
    return wordCnt;
  }

  reverseSentence(str: string): string {
    let readWord = false;
    let charStr = [...str.trim()];
    let revSentence:string = '';
    let word:string = '';
    
    charStr.forEach(c => {
      if((readWord && (c==' ' || c=='\''))
        || (!readWord && c!=' ')) {
        readWord = !readWord;
      }      

      if(!readWord) {
        revSentence = word + ' ' + revSentence;
        word = '';
      } else {
        word = word + c;
      }
    });
    return word + ' ' + revSentence;
  }
}
