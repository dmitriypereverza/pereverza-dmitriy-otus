import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecentlyAddedComponent } from './resently-added/recently-added.component';
import { TrainingComponent } from './training/training.component';
import { SettingsComponent } from './settings/settings.component';
import { RouteNotFoundComponent } from './route-not-found/route-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/recently-added',
    pathMatch: 'full'
  },
  { path: 'recently-added', component: RecentlyAddedComponent },
  { path: 'go', component: TrainingComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', component: RouteNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
