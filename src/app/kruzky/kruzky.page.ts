import { Component, OnInit } from '@angular/core';
import { Platform, AlertController, LoadingController, ToastController } from '@ionic/angular';

import { BasePage } from '../shared/base.page';
import { DataService } from '../services/data.service';
import { Kruzok } from '../models/kruzok.model';

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
    protected dataService: DataService
  ) {
    super(platform, alertCtrl, loadingCtrl, toastCtrl, dataService);
  }

  // ionViewWillEnter() {
  ngOnInit() {
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

  onIonSwipe(event: any) {
    console.log(event);
  }

  vymazatKruzok(id: number) {
    this.dataService.deleteKruzok(id).subscribe(
      () => {
        this.showToast('Krúžok úspešne vymazaný.', 'success');
        this.nacitatKruzky();
      },
      error => {
        this.showErrorToast(error, 'Chyba pri mazaní krúžku!');
      }
    );
  }
}
