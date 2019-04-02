import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecentlyAddedComponent } from './components/resently-added/recently-added.component';
import { TrainingComponent } from './components/training/training.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RouteNotFoundComponent } from './components/route-not-found/route-not-found.component';

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
