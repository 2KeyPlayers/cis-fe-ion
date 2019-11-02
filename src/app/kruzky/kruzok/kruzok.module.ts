import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { KruzokPage } from './kruzok.page';

const routes: Routes = [
  {
    path: '',
    component: KruzokPage,
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: KruzokPage
  }
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [KruzokPage]
})
export class KruzokPageModule {}
