import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from '../../../environments/environment';

export interface TranslateResponse {
  code: number,
  lang: string,
  text: string[]
}

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(
    private http: HttpClient,
  ) {}

  public translate(text, lang): Observable<any> {
    return this.http.get(environment.yaApiUrl, { params: this.buildParams({text, lang})});
  }

  private buildParams(params) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('key', environment.yaTranslateKey);
    for (const paramKey in params) {
      // noinspection JSUnfilteredForInLoop
      httpParams = httpParams.set(paramKey, params[paramKey])
    }
    return httpParams;
  }
}
