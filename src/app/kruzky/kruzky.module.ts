import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { KruzkyPage } from './kruzky.page';

const routes: Routes = [
  {
    path: '',
    component: KruzkyPage,
    pathMatch: 'full'
  },
  {
    path: 'kruzok',
    children: [
      {
        path: '',
        loadChildren: () => import('../kruzky/kruzok/kruzok.module').then(m => m.KruzokPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, RouterModule.forChild(routes)],
  declarations: [KruzkyPage]
})
export class KruzkyPageModule {}
