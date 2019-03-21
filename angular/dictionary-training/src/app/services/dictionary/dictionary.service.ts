import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import * as _ from "lodash";

import { TranslateResponse, TranslateService } from "../translate/translate.service";
import { StorageService } from "../storage/storage.service";

import config from "../../config";

interface RawWordInterface {
  position: number,
  name: string
}

export interface WordInterface {
  position: number;
  name: string;
  translate: string;
  learningProgress?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(
    private translateService: TranslateService,
    private storage: StorageService,
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

  addProgress (word: WordInterface, isSuccess) {
    const wordList = this.getWordList();

    this.storage.save(config.storageKeyList, wordList.map(item => {
      if (item.name.toLowerCase() !== word.name.toLowerCase()) {
        return item;
      }
      item.learningProgress = isSuccess
        ? item.learningProgress + 1
        : item.learningProgress - 2;

      if (item.learningProgress < 0) {
        item.learningProgress = 0;
      }
      if (item.learningProgress > config.maxTrainingProgress) {
        item.learningProgress = config.maxTrainingProgress;
      }
      return item;
    }));
  }

  getWordList(): WordInterface[] {
    return this.storage.get(config.storageKeyList)
  }

  getTrainingWord () {
    const shuffledListWord = _.shuffle(this.getWordList());
    return shuffledListWord
      .find(item =>
        item.learningProgress < config.maxTrainingProgress
      )
  }
}
