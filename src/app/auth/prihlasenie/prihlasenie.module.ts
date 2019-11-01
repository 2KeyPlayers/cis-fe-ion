import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PrihlaseniePage } from './prihlasenie.page';

const routes: Routes = [
  {
    path: '',
    component: PrihlaseniePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PrihlaseniePage]
})
export class PrihlaseniePageModule {}
