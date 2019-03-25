import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { RecentlyAddedComponent } from "./components/resently-added/recently-added.component";
import { TrainingComponent } from "./components/training/training.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { RouteNotFoundComponent } from "./components/route-not-found/route-not-found.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
  MatButtonModule, MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatPaginatorModule,
  MatProgressSpinnerModule, MatSelectModule, MatSnackBarModule,
  MatTableModule,
  MatTabsModule
} from "@angular/material";

@NgModule({
  declarations: [
    AppComponent,
    RecentlyAddedComponent,
    TrainingComponent,
    SettingsComponent,
    RouteNotFoundComponent,
  ],
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,

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
  bootstrap: [AppComponent],
})
export class AppServerModule {}
