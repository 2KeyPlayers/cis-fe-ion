import { Component, OnInit } from '@angular/core';
import { Platform, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BasePage } from 'src/app/shared/base.page';

@Component({
  selector: 'app-ucastnik',
  templateUrl: './ucastnik.page.html',
  styleUrls: ['./ucastnik.page.scss']
})
export class UcastnikPage extends BasePage implements OnInit {
  id: number;

  constructor(
    protected platform: Platform,
    protected alertCtrl: AlertController,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    protected dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(platform, alertCtrl, loadingCtrl, toastCtrl, dataService);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      console.log('ID', this.id);
    });
  }

  ulozit() {
    if (this.formular.invalid) {
      return;
    }
  }
}
