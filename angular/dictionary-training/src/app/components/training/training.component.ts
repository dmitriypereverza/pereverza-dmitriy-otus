import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { DictionaryService, WordInterface } from "../../services/dictionary/dictionary.service";

import * as moment from "moment";
import { StorageService } from "../../services/storage/storage.service";
import config from "../../config";
import { SettingsInterface } from "../settings/settings.component";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingComponent implements OnInit, OnDestroy {

  training = false;
  input: string = '';
  wordList: WordInterface[];

  isSuccess = false;
  isAnswered = false;

  settings: SettingsInterface;

  timeRemained = "00:00";
  timer: any;
  secondsRemained = 0;

  trainingWord: WordInterface;
  constructor(
    private dictionaryService: DictionaryService,
    private storageService: StorageService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.settings = this.storageService.get(config.configKey) as SettingsInterface;
    this.wordList = this.dictionaryService.getWordList();
  }

  public startTrain() {
    this.secondsRemained = this.settings.trainingTime;
    this.training = true;
    this.nextWord();
    this.timerStart();
  }

  public stopTrain() {
    this.training = false;
    this.timerStop();
  }

  public checkTranslate(text) {
    this.stopTrain();

    this.isSuccess = this.trainingWord.translate.toLowerCase() === text.toLowerCase();

    this.dictionaryService.addProgress(this.trainingWord, this.isSuccess);

    this.isAnswered = true;
  }

  doNotNow() {
    this.stopTrain();
    this.dictionaryService.addProgress(this.trainingWord, false);
  }

  private nextWord () {
    this.trainingWord = this.dictionaryService.getTrainingWord();
    this.input = '';
    this.isAnswered = false;
    this.isSuccess = false;

    this.cdr.detectChanges();
  }

  private tick() {
    this.timeRemained = moment.utc(0).seconds(this.secondsRemained).format("mm:ss");
    if (this.secondsRemained < 0) {
      this.stopTrain();
    }
    this.secondsRemained--;
    this.cdr.detectChanges();
  }

  private timerStop() {
    clearInterval(this.timer);
    this.secondsRemained = 0;
  }

  private timerStart() {
    this.timer = setInterval(this.tick.bind(this), 1000);
    this.tick();
  }

  ngOnDestroy (): void {
    this.timerStop();
    if (this.training) {
      this.dictionaryService.addProgress(this.trainingWord, false);
    }
  }
}
