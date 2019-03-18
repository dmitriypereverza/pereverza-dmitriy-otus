import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService, TranslateResponse } from "../../services/translate/translate.service";
import { StorageService } from "../../services/storage/storage.service";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material";

export interface PeriodicElement {
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
  displayedColumns = ['position', 'name', 'translate'];
  dataSource = new MatTableDataSource<PeriodicElement>([
    { name: 'Hydrogen', translate: 'Водород'},
    { name: 'Helium', translate: 'Гелий'},
    { name: 'Lithium', translate: 'Литий'},
  ]);

  storageKeyList = 'wordList';
  text = '';
  loading = false;
  selection = new SelectionModel<PeriodicElement>(true, []);

  constructor(
    private translateService: TranslateService,
    private cdr: ChangeDetectorRef,
    private storage: StorageService,
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
    this.translateService.translate(word, 'ru')
      .subscribe((response: TranslateResponse) => {
        this.dataSource.data.push({ name: word, translate: response.text.pop()});
        this.storage.save(this.storageKeyList, this.dataSource.data);
      }, null, () => {
        this.text = '';
        this.loading = false;
        this.cdr.detectChanges();
      });
  }

  get wordList() {
    return new MatTableDataSource<PeriodicElement>(
      this.dataSource.data.map((row: PeriodicElement, index) => ({...row, position: index + 1}))
    );
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
