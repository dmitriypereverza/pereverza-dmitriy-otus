import { Injectable } from '@angular/core';
import { TranslateResponse, TranslateService } from "../translate/translate.service";
import { Observable } from "rxjs";

interface RawWordInterface {
  position: number,
  name: string
}

export interface WordInterface {
  position: number;
  name: string;
  translate: string;
  learningProgress: number;
}

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(
    private translateService: TranslateService,
  ) {}

  create(word: RawWordInterface): Observable<WordInterface> {
    return Observable.create(observer => {
      this.translateService.translate(word.name, 'ru')
        .subscribe((response: TranslateResponse) => {
          observer.next({
            ...word,
            translate: response.text.pop(),
            learningProgress: 0
          });
          observer.complete();
        })
    });
  }
}
