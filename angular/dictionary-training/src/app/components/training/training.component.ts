import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import config from "../../config";

import * as _ from "lodash";
import { DictionaryService, WordInterface } from "../../services/dictionary/dictionary.service";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingComponent implements OnInit {

  input: string = '';
  wordList: WordInterface[];

  isSuccess = false;
  isAnswered = false;

  trainingWord: WordInterface;
  constructor(
    private dictionaryService: DictionaryService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.wordList = this.dictionaryService.getWordList();
    this.trainingWord = this.dictionaryService.getTrainingWord();
  }

  public checkTranslate(text) {
    this.isSuccess = this.trainingWord.translate.toLowerCase() === text.toLowerCase();

    this.dictionaryService.addProgress(this.trainingWord, this.isSuccess);

    this.isAnswered = true;
    setTimeout(() => {
      this.nextWord();
    }, 2000);
  }

  doNotNow() {
    this.dictionaryService.addProgress(this.trainingWord, false);
    this.nextWord();
  }

  private nextWord () {
    this.trainingWord = this.dictionaryService.getTrainingWord();
    this.input = '';
    this.isAnswered = false;
    this.isSuccess = false;

    this.cdr.detectChanges();
  }
}
