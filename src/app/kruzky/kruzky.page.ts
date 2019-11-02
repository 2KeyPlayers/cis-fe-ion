import { Component, OnInit } from '@angular/core';
import { Platform, AlertController, LoadingController, ToastController } from '@ionic/angular';

import { BasePage } from '../shared/base.page';
import { DataService } from '../services/data.service';
import { Kruzok } from '../models/kruzok.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kruzky',
  templateUrl: 'kruzky.page.html',
  styleUrls: ['kruzky.page.scss']
})
export class KruzkyPage extends BasePage implements OnInit {
  kruzky: Kruzok[];

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

  ngOnInit() {
    // nacitaj veducich aby boli k dispozicii pre upravu/pridavanie
    // this.dataService.loadVeduci();
  }

  ionViewWillEnter() {
    this.nacitatKruzky();
  }

  get ziadneData(): boolean {
    return !this.kruzky;
  }

  private nacitatKruzky() {
    this.kruzky = [];
    this.loading = true;
    this.dataService.getKruzky().subscribe((kruzky: Kruzok[]) => {
      this.kruzky = kruzky;
      this.loading = false;
    });
  }

  upravitKruzok(id: number) {
    this.router.navigate(['/tabs/kruzky/kruzok', id]);
  }
}
