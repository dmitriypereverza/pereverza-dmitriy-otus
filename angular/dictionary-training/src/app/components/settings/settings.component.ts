import { Component, OnInit } from '@angular/core';
import { LanguageInterface } from "../../services/dictionary/dictionary.service";
import { StorageService } from "../../services/storage/storage.service";

import config from "../../config";

export interface SettingsInterface {
  maxTrainingProgress: number;
  trainingLang: string;
  trainingTime: number;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  repeatCases = [3, 5, 7 ,10];
  langList: LanguageInterface[] = [
    {title: 'Английский', code: 'en'},
    {title: 'Французский', code: 'fr'},
    {title: 'Немецкий', code: 'de'},
    {title: 'Греческий', code: 'el'}
  ];

  public settings: SettingsInterface;

  constructor(
    private storage: StorageService,
  ) {}

  ngOnInit() {
    const settings = this.storage.get(config.configKey);
    if (!settings) {
      this.storage.save(config.configKey, {
        maxTrainingProgress: 5,
        trainingLang: 'en',
        trainingTime: 30
      });
      return;
    }
    this.settings = settings;
  }

  public save() {
    this.storage.save(config.configKey, this.settings);
  }

}
