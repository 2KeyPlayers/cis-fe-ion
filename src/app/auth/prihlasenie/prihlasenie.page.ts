import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform, AlertController, LoadingController, ToastController } from '@ionic/angular';

import { BasePage } from 'src/app/shared/base.page';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-prihlasenie',
  templateUrl: './prihlasenie.page.html',
  styleUrls: ['./prihlasenie.page.scss']
})
export class PrihlaseniePage extends BasePage implements OnInit {
  url: string;

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
    this.url = this.platform.getQueryParam('url');
  }

  prihlasit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.loading = true;
    const prezyvka = form.value.prezyvka;
    const heslo = form.value.heslo;

    this.authService.prihlasit(prezyvka, heslo).subscribe(
      () => {
        this.loading = false;
        this.router.navigateByUrl(this.url ? this.url : '');
      },
      () => {
        this.loading = false;
        this.showToast('Prihlásenie neúspešné!');
      }
    );
  }
}
