import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardPageModule' },
      { path: 'tabAlarm', loadChildren: '../tabAlarm/tabAlarm.module#TabAlarmPageModule' },
      { path: 'tab2', loadChildren: '../tab2/tab2.module#Tab2PageModule' },
      { path: 'tabWorkout', loadChildren: '../tabWorkout/tabWorkout.module#TabWorkoutPageModule' },
      { path: 'tabCard', loadChildren: '../tabCard/tabCard.module#TabCardPageModule' },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'} //load default tab when the tabs is initialized

    ]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
