import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfilPage } from './profil.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ProfilPage, pathMatch: 'full' },
      {
        path: 'zmena-hesla',
        children: [
          {
            path: '',
            loadChildren: () => import('../profil/zmena-hesla/zmena-hesla.module').then(m => m.ZmenaHeslaPageModule)
          }
        ]
      }
    ])
  ],
  declarations: [ProfilPage]
})
export class ProfilPageModule {}
