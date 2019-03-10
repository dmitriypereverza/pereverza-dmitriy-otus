import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  position: number;
  name: string;
  translate: string;
}

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.scss']
})
export class RecentlyAddedComponent implements OnInit {
  displayedColumns = ['position', 'name', 'translate'];
  dataSource: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', translate: 'Водород'},
    {position: 2, name: 'Helium', translate: 'Гелий'},
    {position: 3, name: 'Lithium', translate: 'Литий'},
  ];

  constructor() { }

  ngOnInit() {
  }

}
