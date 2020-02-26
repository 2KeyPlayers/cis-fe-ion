import { Component, OnInit } from '@angular/core';
import { Platform, AlertController, LoadingController, ToastController } from '@ionic/angular';

import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { BasePage } from 'src/app/shared/base.page';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-zmena-hesla',
  templateUrl: './zmena-hesla.page.html',
  styleUrls: ['./zmena-hesla.page.scss']
})
export class ZmenaHeslaPage extends BasePage implements OnInit {
  constructor(
    protected platform: Platform,
    protected alertCtrl: AlertController,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    protected dataService: DataService,
    private authService: AuthService
  ) {
    super(platform, alertCtrl, loadingCtrl, toastCtrl, dataService);
  }

  ngOnInit() {}

  ZmenitHeslo(form: NgForm) {
    if (!form.valid) {
      this.showToast('Neúplne vyplnený formulár');
      return;
    }
    const aktualneHeslo = form.value.aktualneHeslo;
    const noveHeslo = form.value.noveHeslo;
    const noveHeslo2 = form.value.noveHeslo2;
    if (noveHeslo !== noveHeslo2) {
      this.showToast('Nezhoda v zadaní nového hesla!');
    } else {
      this.loading = true;
      this.dataService
        .postHeslo({
          id: this.authService.uzivatel.id,
          aktualneHeslo: aktualneHeslo,
          noveHeslo: noveHeslo
        })
        .subscribe(
          zmenaHeslaUspesna => {
            if (zmenaHeslaUspesna) {
              this.showToast('Zmena hesla bola úspešná, heslo zmenene na: ' + noveHeslo);
              form.reset();
              // TODO: presmerovat na "http://localhost:8100/tabs/profil";
              // ...
              // this.router.navigateByUrl('profile');
              // ...
            } else {
              // zatial sa nepouziva, lebo vracia iba true;
              this.showToast('ZmenaHeslaUspesna = false');
            }
          },
          error => {
            this.loading = false;
            this.showErrorToast(error, 'Zmena hesla neúspešna!');
          }
        );
      // this.showToast('Aktuálne heslo nie je správne!');
    }
  }
}
