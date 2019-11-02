import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { BasePage } from '../shared/base.page';
import { AuthService } from '../auth/auth.service';
import { Uzivatel } from '../models/uzivatel.model';
import { Platform, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-profil',
  templateUrl: 'profil.page.html',
  styleUrls: ['profil.page.scss']
})
export class ProfilPage extends BasePage implements OnInit, OnDestroy {
  uzivatel: Uzivatel;
  subscription: Subscription;

  constructor(
    protected platform: Platform,
    protected alertCtrl: AlertController,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    protected dataService: DataService,
    private router: Router,
    private authService: AuthService
  ) {
    super(platform, alertCtrl, loadingCtrl, toastCtrl, dataService);
  }

  ngOnInit() {
    this.uzivatel = this.authService.uzivatel;
    // this.subscription = this.authService.uzivatelSubscription().subscribe(uzivatel => (this.uzivatel = uzivatel));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  odhlasit() {
    this.authService.odhlasit();
    this.router.navigateByUrl('/prihlasenie');
  }
}
