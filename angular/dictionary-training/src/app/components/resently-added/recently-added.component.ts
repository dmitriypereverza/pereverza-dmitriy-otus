import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatTableDataSource } from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";

import { StorageService } from "../../services/storage/storage.service";
import { DictionaryService, WordInterface } from "../../services/dictionary/dictionary.service";

import config from "../../config";
import { SettingsInterface } from "../settings/settings.component";

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentlyAddedComponent implements OnInit {
  @ViewChild('checkExist') tplCheckExist: TemplateRef<any>;

  displayedColumns: string[] = ['select', 'position', 'name', 'translate', 'learningProgress'];
  dataSource = new MatTableDataSource<WordInterface>();

  text = '';
  loading = false;
  selection = new SelectionModel<WordInterface>(true, []);
  snackBarConfig: MatSnackBarConfig = { duration: 1500, horizontalPosition: "right" };

  constructor(
    private cdr: ChangeDetectorRef,
    private storage: StorageService,
    private dictionaryService: DictionaryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const elements = this.dictionaryService.getCurrentLangWordList().reverse();
    if (elements) {
      this.dataSource.data = elements;
    }
  }

  addField(word) {
    if (!word || this.checkExist(word)) {
      this.text = '';
      return;
    }

    this.loading = true;
    this.cdr.detectChanges();

    const rawWord = {
      name: word,
      position: this.getNextPosition()
    };
    this.dictionaryService.create(rawWord)
      .subscribe((word: WordInterface) => {
        if (word.name === word.translate) {
          return;
        }
        this.dataSource.data = [...this.dataSource.data, word];
        this.storage.save(config.storageKeyList, [...this.dictionaryService.getWordList(), word]);
      }, null, () => {
        this.text = '';
        this.loading = false;
        this.cdr.detectChanges();
      });

  }


  checkExist(word: string) {
    const isExist = this.dataSource.data.some(item => item.name === word);
    isExist && this.snackBar.openFromTemplate(this.tplCheckExist, this.snackBarConfig);
    return isExist;
  }

  private getNextPosition() {
    return (this.dataSource.data.reduce((acc, item) => acc > item.position ? acc : item.position, 1)) + 1
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: WordInterface, index?): string {
    return !row
      ? `${this.isAllSelected() ? 'select' : 'deselect'} all`
      : `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${index + 1}`;
  }

  deleteSelection() {
    const selectedIndexes = this.selection.selected.map(row => row.position);
    this.dataSource.data = this.dataSource.data.filter(elem => !selectedIndexes.includes(elem.position));
    this.storage.save(config.storageKeyList, this.dataSource.data);
  }

  progressInPercent(item: WordInterface) {
    return (item.learningProgress / config.maxTrainingProgress) * 100;
  }
}
