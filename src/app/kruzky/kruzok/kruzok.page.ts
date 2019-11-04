import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Platform, AlertController, LoadingController, ToastController } from '@ionic/angular';

import { BasePage } from 'src/app/shared/base.page';
import { DataService } from 'src/app/services/data.service';
import { Veduci, Kruzok } from 'src/app/models/kruzok.model';
import { Ucastnik } from 'src/app/models/ucastnik.model';
import { AuthService } from 'src/app/auth/auth.service';
import { KruzokValidator } from 'src/app/validators/kruzok.validator';

@Component({
  selector: 'app-kruzok',
  templateUrl: './kruzok.page.html',
  styleUrls: ['./kruzok.page.scss']
})
export class KruzokPage extends BasePage implements OnInit {
  mod: 'normal' | 'tlac' = 'normal';

  kruzok: Kruzok;
  veduci: Veduci[];
  ucasnici: Ucastnik[];

  constructor(
    protected platform: Platform,
    protected alertCtrl: AlertController,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    protected dataService: DataService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    super(platform, alertCtrl, loadingCtrl, toastCtrl, dataService);
  }

  ngOnInit() {
    this.loading = true;

    this.formular = new FormGroup({
      id: new FormControl(null),
      nazov: new FormControl(null, Validators.required),
      veduci: new FormControl(null, Validators.required),
      zadarmo: new FormControl(null),
      uzivatel: new FormControl(this.authService.uzivatel.id)
    });

    this.dataService.getVeduci().subscribe(veduci => (this.veduci = veduci));

    this.route.params.subscribe((params: Params) => {
      const id = +params.id;

      if (id) {
        // this.mod = EMod.Upravit;
        this.dataService.getKruzok(id).subscribe((kruzok: Kruzok) => {
          this.kruzok = kruzok;
          this.formular.patchValue({
            id: kruzok.id,
            nazov: kruzok.nazov,
            veduci: kruzok.veduci,
            zadarmo: kruzok.zadarmo
          });
          this.loading = false;
        });
      } else {
        // this.mod = EMod.Pridat;
        this.loading = false;
      }
    });
  }

  zmenMod() {
    this.mod = this.mod === 'tlac' ? 'normal' : 'tlac';
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

    const value = this.formular.value;

    this.dataService.skontrolujKruzok(value.id, value.nazov).subscribe(
      (vysledok: { nazovExistuje: boolean }) => {
        if (vysledok.nazovExistuje) {
          this.showToast('Zadaný názov už existuje!');
          return;
        }

        if (this.modPridat) {
          this.dataService.insertKruzok(value).subscribe(
            () => {
              this.showToast('Krúžok úspešne pridaný.', 'success');
              this.formular.reset();
            },
            error => {
              this.showErrorToast(error, 'Chyba pri pridávaní krúžku!');
            }
          );
        } else {
          this.dataService.updateKruzok(value).subscribe(
            () => {
              this.showToast('Krúžok úspešne upravený.', 'success');
            },
            error => {
              this.showErrorToast(error, 'Chyba pri úprave krúžku!');
            }
          );
        }
      },
      error => {
        this.showErrorToast(error, 'Chyba pri kontrole krúžku!');
      }
    );
  }
}
