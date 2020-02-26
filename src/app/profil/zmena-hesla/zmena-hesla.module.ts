import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ZmenaHeslaPage } from './zmena-hesla.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild([{ path: '', component: ZmenaHeslaPage }])],
  declarations: [ZmenaHeslaPage]
})
export class ZmenaHeslaPageModule {}
