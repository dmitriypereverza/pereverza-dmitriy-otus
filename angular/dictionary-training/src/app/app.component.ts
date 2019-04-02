import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Приложения для запоминания иностранных слов';

  navLinks = [
    { path: 'recently-added', label: 'Недавно добавленные' },
    { path: 'go', label: 'Треннировка' },
    { path: 'settings', label: 'Настройки' }
  ];
}
