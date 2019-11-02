import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Platform, AlertController, LoadingController, ToastController } from '@ionic/angular';

import { BasePage, EMod } from 'src/app/shared/base.page';
import { DataService } from 'src/app/services/data.service';
import { Veduci, Kruzok } from 'src/app/models/kruzok.model';
import { Ucastnik } from 'src/app/models/ucastnik.model';

@Component({
  selector: 'app-kruzok',
  templateUrl: './kruzok.page.html',
  styleUrls: ['./kruzok.page.scss']
})
export class KruzokPage extends BasePage implements OnInit {
  kruzok: Kruzok;
  veduci: Veduci[];
  ucasnici: Ucastnik[];

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
    this.loading = true;

    this.formular = new FormGroup({
      nazov: new FormControl(null, Validators.required),
      veduci: new FormControl(null, Validators.required),
      zadarmo: new FormControl(null)
    });

    // TODO: resolve
    this.dataService.getVeduci().subscribe(veduci => (this.veduci = veduci));
    // this.veduci = this.dataService.getVeduci();

    this.route.params.subscribe((params: Params) => {
      const id = +params.id;
      console.log('ID', id);

      if (id) {
        this.mod = EMod.Upravit;
        this.dataService.getKruzok(id).subscribe((kruzok: Kruzok) => {
          this.kruzok = kruzok;
          this.formular.patchValue({
            nazov: kruzok.nazov,
            veduci: kruzok.veduci,
            zadarmo: kruzok.zadarmo
          });
          this.loading = false;
        });
      } else {
        this.mod = EMod.Pridat;
        this.loading = false;
      }
    });
  }

  get ziadneData(): boolean {
    if (this.kruzok) {
      return this.kruzok.pocetUcastnikov === 0;
    }
    return true;
  }

  ulozit() {
    if (this.formular.invalid) {
      return;
    }
  }
}
