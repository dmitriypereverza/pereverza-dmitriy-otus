import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  MatTableModule,
  MatTabsModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecentlyAddedComponent } from './resently-added/recently-added.component';
import { TrainingComponent } from './training/training.component';
import { SettingsComponent } from './settings/settings.component';
import { RouteNotFoundComponent } from './route-not-found/route-not-found.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    RecentlyAddedComponent,
    TrainingComponent,
    SettingsComponent,
    RouteNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // Angular Material
    BrowserAnimationsModule,
    MatTabsModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
