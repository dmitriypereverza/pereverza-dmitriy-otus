import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  save(key, data) {
    console.log(data);
    if (typeof data === 'object' && data !== null) {
      data = JSON.stringify(data);
    }
    localStorage.setItem(key, data);
  }

  get(key): any {
    let data = localStorage.getItem(key);
    if (!data) {
      return;
    }

    try { data = JSON.parse(data) }
    catch (e) { console.log(e) }

    return data;
  }
}
