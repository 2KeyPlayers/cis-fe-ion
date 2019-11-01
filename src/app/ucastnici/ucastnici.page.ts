import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform, AlertController, LoadingController, ToastController } from '@ionic/angular';

import { BasePage } from '../shared/base.page';
import { DataService } from '../services/data.service';
import { Ucastnik, EPohlavie } from '../models/ucastnik.model';

@Component({
  selector: 'app-ucastnici',
  templateUrl: 'ucastnici.page.html',
  styleUrls: ['ucastnici.page.scss']
})
export class UcastniciPage extends BasePage {
  ucastnici: Ucastnik[];

  constructor(
    protected platform: Platform,
    protected alertCtrl: AlertController,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    protected dataService: DataService,
    private router: Router
  ) {
    super(platform, alertCtrl, loadingCtrl, toastCtrl, dataService);
  }

  ionViewWillEnter() {
    this.nacitatUcastnikov();
  }

  get ziadneData(): boolean {
    return !this.ucastnici;
  }

  private nacitatUcastnikov() {
    this.ucastnici = [];
    this.loading = true;
    this.dataService.getUcastnici().subscribe((ucastnici: Ucastnik[]) => {
      this.ucastnici = ucastnici;
      this.loading = false;
    });
  }

  pridatUcastnika() {
    this.router.navigateByUrl('/ucastnik/pridat');
  }

  upravitUcastnika(id: number) {
    this.router.navigate(['/ucastnik', id]);
  }
}
