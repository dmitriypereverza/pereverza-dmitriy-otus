import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";

import { StorageService } from "../../services/storage/storage.service";
import { TranslateService, TranslateResponse } from "../../services/translate/translate.service";
import { DictionaryService, WordInterface } from "../../services/dictionary/dictionary.service";

export interface PeriodicElement {
  position: number;
  name: string;
  translate: string;
}

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentlyAddedComponent implements OnInit {
  displayedColumns: string[] = ['select', 'position', 'name', 'translate'];
  dataSource = new MatTableDataSource<PeriodicElement>([
    {position: 1, name: 'Hydrogen', translate: 'Водород'},
    {position: 2, name: 'Helium', translate: 'Гелий'},
    {position: 3, name: 'Lithium', translate: 'Литий'},
  ]);

  storageKeyList = 'wordList';
  text = '';
  loading = false;
  selection = new SelectionModel<PeriodicElement>(true, []);

  constructor(
    private cdr: ChangeDetectorRef,
    private storage: StorageService,
    private dictionaryService: DictionaryService,
  ) {}

  ngOnInit() {
    const elements = this.storage.get(this.storageKeyList);
    if (elements) {
      this.dataSource.data = elements;
    }
  }

  addField(word) {
    if (!word) return;

    this.loading = true;
    this.cdr.detectChanges();

    const rawWord = {
      name: word,
      position: this.getNextPosition()
    };
    this.dictionaryService.create(rawWord)
      .subscribe((word: WordInterface) => {
        this.dataSource.data = [...this.dataSource.data, word];
        this.storage.save(this.storageKeyList, this.dataSource.data);
      }, null, () => {
        this.text = '';
        this.loading = false;
        this.cdr.detectChanges();
      });

  }

  getNextPosition() {
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

  checkboxLabel(row?: PeriodicElement, index?): string {
    return !row
      ? `${this.isAllSelected() ? 'select' : 'deselect'} all`
      : `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${index + 1}`;
  }

  deleteSelection() {
    const selectedIndexes = this.selection.selected.map(row => row.position);
    this.dataSource.data = this.dataSource.data.filter(elem => !selectedIndexes.includes(elem.position))
  }
}
