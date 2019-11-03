import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UcastniciPage } from './ucastnici.page';

const routes: Routes = [
  {
    path: '',
    component: UcastniciPage,
    pathMatch: 'full'
  },
  {
    path: 'ucastnik',
    children: [
      {
        path: '',
        loadChildren: () => import('../ucastnici/ucastnik/ucastnik.module').then(m => m.UcastnikPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, RouterModule.forChild(routes)],
  declarations: [UcastniciPage]
})
export class UcastniciPageModule {}
