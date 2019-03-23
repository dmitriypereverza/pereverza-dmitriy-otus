import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import * as _ from "lodash";

import { TranslateResponse, TranslateService } from "../translate/translate.service";
import { StorageService } from "../storage/storage.service";

import config from "../../config";
import { SettingsInterface } from "../../components/settings/settings.component";

interface RawWordInterface {
  position: number,
  name: string
}

export interface WordInterface {
  position: number;
  name: string;
  translate: string;
  learningProgress?: number;
  langCode?: string;
}

export interface LanguageInterface {
  title: string;
  code: string;
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
    const setting = this.storage.get(config.configKey) as SettingsInterface;

    return Observable.create(observer => {
      this.translateService.translate(word.name, setting ? setting.trainingLang : 'en')
        .subscribe((response: TranslateResponse) => {
          observer.next({
            ...word,
            translate: response.text.pop(),
            learningProgress: 0,
            langCode: setting ? setting.trainingLang : 'en'
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

  getWordList(lang?): WordInterface[] {
    const list = this.storage.get(config.storageKeyList) as WordInterface[];
    return list
      ? lang
        ? list.filter(item => item.langCode === lang)
        : list
      : [];
  }

  getCurrentLangWordList() {
    const setting = this.storage.get(config.configKey) as SettingsInterface;
    return this.getWordList(setting ? setting.trainingLang : 'en');
  }

  getTrainingWord () {
    const shuffledListWord = _.shuffle(this.getCurrentLangWordList());
    return shuffledListWord
      .find(item =>
        item.learningProgress < config.maxTrainingProgress
      )
  }
}
