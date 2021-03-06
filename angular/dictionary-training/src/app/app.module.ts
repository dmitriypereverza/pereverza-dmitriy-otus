import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatTableModule,
  MatTabsModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatButtonModule,
  MatSelectModule,
  MatCardModule,
  MatSnackBarModule,
  MatIconModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecentlyAddedComponent } from "./components/resently-added/recently-added.component";
import { TrainingComponent } from "./components/training/training.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { RouteNotFoundComponent } from "./components/route-not-found/route-not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    RecentlyAddedComponent,
    TrainingComponent,
    SettingsComponent,
    RouteNotFoundComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    // Angular Material
    BrowserAnimationsModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
